// Core
import { Injectable, Inject } from "@nestjs/common";
// Types
import { ID, FilesMetadata, File } from "src/types";
// Services
import { StorageEngine, STORAGE_ENGINE } from "src/core/storage";
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
        @Inject(STORAGE_ENGINE)
        private readonly storage: StorageEngine,
        private readonly config: ConfigService,
        private readonly repository: PlayersRepository
    ) { 
        this.storage.setDestination(process.env.PLAYERS_FILES || 'players');
    }

    async getList(limit?: number, page?: number, search?: string): Promise<Player[]> {

        // set default limit when page is declared but limit not
        if (page && typeof limit === 'undefined') {
            limit = this.config.get<number>('pagination.limit', 10);
        }

        return await this.repository.getList(limit, page, search);
    }

    async getOne(id: ID): Promise<Player> {
        return await this.repository.getOne(id);
    }

    async create(player: CreatePlayerDto, files: FilesMetadata): Promise<Player> {
        
        const uploadedFiles: File[] = await this.storage.upload(files, [player.name, player.surname]);

        // add uploaded filenames to player object
        for (const file of uploadedFiles) {
            player[file.fieldname] = file.filename;
        }

        return this.repository.create(player);
    }

    async update(id: ID, player: UpdatePlayerDto, files: FilesMetadata): Promise<Player> {

        const uploadedFiles: File[] = await this.storage.upload(files, [player.name, player.surname]);

        // add uploaded filenames to player object
        for (const file of uploadedFiles) {
            player[file.fieldname] = file.filename;
        }

        return this.repository.update(id, player);
    }

    async delete(id: ID): Promise<ID> {
        return this.repository.delete(id);
    }

}