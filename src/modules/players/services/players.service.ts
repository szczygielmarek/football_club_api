// Core
import { Injectable } from "@nestjs/common";
// Types
import { ID } from "src/types";
// Services
import { AppLogger } from "src/core/log/logger.service";
// Models
import { Player } from "../models/player.model";
import { CreatePlayerDto } from "../dtos/create-player.dto";
import { UpdatePlayerDto } from "../dtos/update-player.dto";


@Injectable()
export class PlayersService {

    constructor(private readonly logger: AppLogger) {
        this.logger.setContext('PlayersService');
    }

    async getList(limit?: number, page?: number, search?: string): Promise<Player[]> {
        this.logger.log(`getList(page: ${page}, limit: ${limit} search: ${search})`);
        // return await this.playersRepository.getList();
        return [];
    }

    async getPlayer(id: ID): Promise<Player> {
        this.logger.log(`getPlayer(id: ${id})`);
        // return await this.playersRepository.getOne(id);
        return null;
    }

    async create(player: CreatePlayerDto): Promise<Player> {
        this.logger.log(`create(player: ${player})`);
        // return await this.playerRepository.create(player);
        return null;
    }

    async update(id: ID, player: UpdatePlayerDto): Promise<Player> {
        this.logger.log(`update(id: ${id}, player: ${player})`);
        // return await this.playerRepository.update(id, player);
        return null;
    }

    async delete(id: ID): Promise<ID> {
        this.logger.log(`delete(id: ${id})`);
        // return await this.playerRepository.delete(id);
        return id;
    }

}