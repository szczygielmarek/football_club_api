// Core
import { Injectable, Inject } from "@nestjs/common";
// Types
import { ID, FilesMetadata, File } from "src/types";
// Services
import { ConfigService } from "@nestjs/config";
import { StorageEngine, STORAGE_ENGINE } from "src/core/storage";
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
        private readonly config: ConfigService,
        @Inject(STORAGE_ENGINE)
        private readonly storage: StorageEngine,
        private readonly repository: PlayersRepository
    ) {
        this.storage.setDestination(process.env.PLAYERS_FILES || 'players');
    }

    /**
     * @param  {number} limit?
     * @param  {number} page?
     * @param  {string} search?
     * @returns Promise
     */
    async getList(limit?: number, page?: number, search?: string): Promise<Player[]> {

        // set default limit when page is declared but limit not
        if (page && typeof limit === 'undefined') {
            limit = this.config.get<number>('pagination.limit', 10);
        }

        return await this.repository.getList(limit, page, search);
    }

    /**
     * @param  {ID} id
     * @returns Promise
     */
    async getOne(id: ID): Promise<Player> {
        return await this.repository.getOne(id);
    }

    /**
     * @param  {CreatePlayerDto} player
     * @param  {FilesMetadata} files
     * @returns Promise
     */
    async create(player: CreatePlayerDto, files: FilesMetadata): Promise<Player> {

        const uploadedFiles: File[] = await this.storage.upload(files, [player.name, player.surname]);

        // add uploaded filenames to player object
        for (const file of uploadedFiles) {
            player[file.fieldname] = file.filename;
        }

        return this.repository.create(player);
    }

    /**
     * @param  {ID} id
     * @param  {UpdatePlayerDto} player
     * @param  {FilesMetadata} files
     * @returns Promise
     */
    async update(id: ID, player: UpdatePlayerDto, files: FilesMetadata): Promise<Player> {

        const uploadedFiles: File[] = await this.storage.upload(files, [player.name, player.surname]);

        // add uploaded filenames to player object
        for (const file of uploadedFiles) {
            player[file.fieldname] = file.filename;
        }

        return this.repository.update(id, player);
    }

    /**
     * @param  {ID} id
     * @returns Promise
     */
    async delete(id: ID): Promise<ID> {
        return this.repository.delete(id);
    }

}