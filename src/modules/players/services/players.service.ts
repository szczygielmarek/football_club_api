// Core
import { Injectable } from "@nestjs/common";
// Types
import { ID } from "src/types";
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

    async create(player: CreatePlayerDto): Promise<Player> {
        return this.repository.create(player);
    }

    async update(id: ID, player: UpdatePlayerDto): Promise<Player> {
        return this.repository.update(id, player);
    }

    async delete(id: ID): Promise<ID> {
        return this.repository.delete(id);
    }

}