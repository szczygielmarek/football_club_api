// Core
import { Inject, InternalServerErrorException, Injectable } from "@nestjs/common";
// Types
import { ID } from "src/types";
// Providers
import { DATABASE_CONNECTION, DatabaseConnection } from "src/core/database";
import { AppLogger } from "src/core/log/logger.service";
// Interfaces
import { PlayersRepositoryInterface } from "../interfaces/players-repository.interface";
// Models
import { Player } from "../models/player.model";
import { CreatePlayerDto } from "../dtos/create-player.dto";
import { UpdatePlayerDto } from "../dtos/update-player.dto";
// Helpers
import { nestColumnsFrom } from "src/helpers/database.helpers";


@Injectable()
export class PlayersRepository implements PlayersRepositoryInterface {

    /**
     * SQL statement handler
     */
    private playersSQL: string;

    constructor(
        @Inject(DATABASE_CONNECTION)
        private readonly connection: DatabaseConnection,
        private readonly logger: AppLogger,
    ) {

        this.logger.setContext('PlayersRepository');

        this.playersSQL = `SELECT 
            p.id, 
            p.name, 
            p.surname, 
            p.date_of_birth,
            JSON_OBJECT(
                'id', p.country_id,
                'name', c.name,
                'image', c.image
            ) AS country,
            JSON_OBJECT(
                'id', pc.country_id,
                'name', cc.name,
                'image', cc.image
            ) AS citizenship,
            JSON_OBJECT(
                'id', ppob.city_id,
                'name', city.name,
                'country', ccountry.name,
                'country_obj_example', JSON_OBJECT(
                    'id', city.country_id,
                    'name', ccountry.name,
                    'image', ccountry.image
                )
            ) AS place_of_birth,
            JSON_OBJECT(
                'id', pp.position_id,
                'main', position.main,
                'detailed', position.detailed
            ) AS position,
            pcd.date AS debut,
            pd.description,
            pi.profile_image,
            pi.cover_image,
            p.foot, 
            p.height, 
            p.weight
        FROM 
            player p 
        LEFT JOIN country c ON c.id = p.country_id
        LEFT JOIN player_description pd ON pd.player_id = p.id
        LEFT JOIN player_images pi ON pi.player_id = p.id
        LEFT JOIN player_club_debut pcd ON pcd.player_id = p.id
        LEFT JOIN player_citizenship pc ON pc.player_id = p.id
            LEFT JOIN country cc ON pc.country_id = cc.id
        LEFT JOIN player_place_of_birth ppob ON ppob.player_id = p.id
            LEFT JOIN city ON ppob.city_id = city.id
            LEFT JOIN country ccountry ON city.country_id = ccountry.id
        LEFT JOIN player_position pp ON pp.player_id = p.id
            LEFT JOIN position ON position.id = pp.position_id`;

    }

    /** @inheritdoc */
    async getList(limit?: number, page?: number, search?: string): Promise<Player[]> {
        let sql = this.playersSQL;

        if (search) {
            sql += ` WHERE p.name LIKE '%${search}%' OR p.surname LIKE '%${search}%'`;
        }

        sql += ` ORDER BY id ASC`;

        if (limit) {
            sql += ` LIMIT ${limit}`;
        }

        if (page) {
            const offset = (page - 1) * limit;
            sql += ` OFFSET ${offset}`;
        }

        try {
            const players = await this.connection.asyncQuery(sql);
            return nestColumnsFrom(players, ['country', 'citizenship', 'place_of_birth', 'position']);
        } catch (e) {
            this.logger.error(`getList(page: ${page}, limit: ${limit} search: ${search})`, e, 'HVcpA');
            throw new InternalServerErrorException();
        }
    }

    /** @inheritdoc */
    async getOne(id: ID): Promise<Player> {
        const sql = `${this.playersSQL} WHERE p.id = ?`;

        try {
            const player = await this.connection.asyncQuery(sql, id);
            return nestColumnsFrom(player, ['country', 'citizenship', 'place_of_birth', 'position'])[0];
        } catch (e) {
            this.logger.error(`getOne(id: ${id})`, e, 'MHopR');
            throw new InternalServerErrorException();
        }
    }

    /** inheritdoc */
    async create(player: CreatePlayerDto): Promise<Player> {
        try {
            this.connection.beginTransaction();

            // player
            const { name, surname, date_of_birth, country_id, foot, weight, height } = player;
            const result = await this.connection.asyncQuery(`INSERT INTO player SET ?`, {
                name, surname, date_of_birth, country_id, foot, weight, height
            });

            const player_id = result.insertId;
            if (!player_id) {
                this.logger.error(`INSERT INTO player`, null, 'MHopR');
                throw new InternalServerErrorException();
            }

            // player_description
            const { description } = player;
            if (description) {
                await this.connection.asyncQuery(`INSERT INTO player_description SET ?`, {
                    player_id, description
                });
            }

            // player_images
            const { profile_image, cover_image } = player;
            if (profile_image || cover_image) {
                await this.connection.asyncQuery(`INSERT INTO player_images SET ?`, {
                    player_id, profile_image, cover_image
                });
            }

            // player_citizenship
            const { citizenship_id } = player;
            if (citizenship_id) {
                await this.connection.asyncQuery(`INSERT INTO player_citizenship SET ?`, {
                    player_id, country_id: citizenship_id
                });
            }

            // player_club_debut
            const { debut } = player;
            if (debut) {
                await this.connection.asyncQuery(`INSERT INTO player_club_debut SET ?`, {
                    player_id, date: debut
                });
            }

            // player_place_of_birth
            const { place_of_birth_id } = player;
            if (place_of_birth_id) {
                await this.connection.asyncQuery(`INSERT INTO player_place_of_birth SET ?`, {
                    player_id, city_id: place_of_birth_id
                });
            }

            // player_position
            const { position_id } = player;
            if (position_id) {
                await this.connection.asyncQuery(`INSERT INTO player_position SET ?`, {
                    player_id, position_id
                });
            }

            this.connection.commit();
            return await this.getOne(player_id);

        } catch (e) {
            this.connection.rollback();
            this.logger.error(`create(player: ${player})`, e, 'HOac1');
            throw new InternalServerErrorException();
        }
    }

    /** @inheritdoc */
    async update(id: ID, player: UpdatePlayerDto): Promise<Player> {
        let sql: string;

        try {
            this.connection.beginTransaction();

            // player
            const { name } = player;
            if (name) {
                sql = `UPDATE player SET name = ? WHERE id = ?`;
                await this.connection.asyncQuery(sql, [name, id]);
            }
            const { surname } = player;
            if (surname) {
                sql = `UPDATE player SET surname = ? WHERE id = ?`;
                await this.connection.asyncQuery(sql, [surname, id]);
            }
            const { date_of_birth } = player;
            if (date_of_birth) {
                sql = `UPDATE player SET date_of_birth = ? WHERE id = ?`;
                await this.connection.asyncQuery(sql, [date_of_birth, id]);
            }
            const { country_id } = player;
            if (country_id) {
                sql = `UPDATE player SET country_id = ? WHERE id = ?`;
                await this.connection.asyncQuery(sql, [country_id, id]);
            }
            const { foot } = player;
            if (foot) {
                sql = `UPDATE player SET foot = ? WHERE id = ?`;
                await this.connection.asyncQuery(sql, [foot, id]);
            }
            const { height } = player;
            if (height) {
                sql = `UPDATE player SET height = ? WHERE id = ?`;
                await this.connection.asyncQuery(sql, [height, id]);
            }
            const { weight } = player;
            if (weight) {
                sql = `UPDATE player SET weight = ? WHERE id = ?`;
                await this.connection.asyncQuery(sql, [weight, id]);
            }

            // player_description
            const { description } = player;
            if (description) {
                sql = `INSERT INTO player_description (player_id, description) VALUES (?, ?)
                    ON DUPLICATE KEY UPDATE description = ?`;
                await this.connection.asyncQuery(sql, [id, description, description]);
            }

            // player_images
            const { profile_image, cover_image } = player;
            if (profile_image) {
                sql = `INSERT INTO player_images (player_id, profile_image) VALUES (?, ?)
                    ON DUPLICATE KEY UPDATE profile_image = ?`;
                await this.connection.asyncQuery(sql, [id, profile_image, profile_image]);
            }
            if (cover_image) {
                sql = `INSERT INTO player_images (player_id, cover_image) VALUES (?, ?)
                    ON DUPLICATE KEY UPDATE cover_image = ?`;
                await this.connection.asyncQuery(sql, [id, cover_image, cover_image]);
            }

            // player_citizenship
            const { citizenship_id } = player;
            if (citizenship_id) {
                sql = `INSERT INTO player_citizenship (player_id, country_id) VALUES (?, ?)
                    ON DUPLICATE KEY UPDATE country_id = ?`;
                await this.connection.asyncQuery(sql, [id, citizenship_id, citizenship_id]);
            }

            // player_club_debut
            const { debut } = player;
            if (debut) {
                sql = `INSERT INTO player_club_debut (player_id, date) VALUES (?, ?)
                    ON DUPLICATE KEY UPDATE date = ?`;
                await this.connection.asyncQuery(sql, [id, debut, debut]);
            }

            // player_place_of_birth
            const { place_of_birth_id: city_id } = player;
            if (city_id) {
                sql = `INSERT INTO player_place_of_birth (player_id, city_id) VALUES (?, ?)
                    ON DUPLICATE KEY UPDATE city_id = ?`;
                await this.connection.asyncQuery(sql, [id, city_id, city_id]);
            }

            // player_position
            const { position_id } = player;
            if (position_id) {
                sql = `INSERT INTO player_position (player_id, position_id) VALUES (?, ?)
                    ON DUPLICATE KEY UPDATE position_id = ?`;
                await this.connection.asyncQuery(sql, [id, position_id, position_id]);
            }

            this.connection.commit();
            return await this.getOne(id);

        } catch (e) {
            this.connection.rollback();
            this.logger.error(`update(id: ${id}, player: ${player})`, e, 'HHop2');
            throw new InternalServerErrorException();
        }
    }

    /** inheritdoc */
    async delete(id: ID): Promise<ID> {
        const sql = `DELETE p.*, pd.*, pi.*, pcd.*, pc.*, ppob.*, pp.*
            FROM 
                player p
            LEFT JOIN player_description pd ON pd.player_id = p.id
            LEFT JOIN player_images pi ON pi.player_id = p.id
            LEFT JOIN player_club_debut pcd ON pcd.player_id = p.id
            LEFT JOIN player_citizenship pc ON pc.player_id = p.id
            LEFT JOIN player_place_of_birth ppob ON ppob.player_id = p.id
            LEFT JOIN player_position pp ON pp.player_id = p.id
            WHERE p.id = ?`;

        try {
            await this.connection.asyncQuery(sql, id);
            return id;
        } catch (e) {
            this.logger.error(`delete(id: ${id})`, e, 'DDvh8');
            throw new InternalServerErrorException();
        }
    }

}