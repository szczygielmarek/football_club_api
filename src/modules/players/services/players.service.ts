// Core
import { Injectable } from "@nestjs/common";
// Types
import { ID, Files } from "src/types";
// Services
import { ConfigService } from "@nestjs/config";
import { PlayersRepository } from "../repositories/players.repository";
// Models
import { Player } from "../models/player.model";
import { CreatePlayerDto } from "../dtos/create-player.dto";
import { UpdatePlayerDto } from "../dtos/update-player.dto";


/**
 * CRUD services for Players
 */
@Injectable()
export class PlayersService {

    constructor(
        private readonly configService: ConfigService,
        private readonly repository: PlayersRepository
    ) { }

    async getList(limit?: number, page?: number, search?: string): Promise<Player[]> {

        // set default limit when page is declared but limit not
        if (page && typeof limit === 'undefined') {
            limit = this.configService.get<number>('pagination.limit', 10);
        }

        return await this.repository.getList(limit, page, search);
    }

    async getOne(id: ID): Promise<Player> {
        return await this.repository.getOne(id);
    }

    async create(player: CreatePlayerDto, files: Files): Promise<Player> {

        // put storage filenames to player object
        for (const property in files) {
            const fieldname = files[property][0].fieldname;
            const filename = files[property][0].filename;
            player[fieldname] = filename;
        }

        return this.repository.create(player);
    }

    async update(id: ID, player: UpdatePlayerDto, files: Files): Promise<Player> {

        // put storage filenames to player object
        for (const property in files) {
            const fieldname = files[property][0].fieldname;
            const filename = files[property][0].filename;
            player[fieldname] = filename;
        }

        return this.repository.update(id, player);
    }

    async delete(id: ID): Promise<ID> {
        return this.repository.delete(id);
    }

}