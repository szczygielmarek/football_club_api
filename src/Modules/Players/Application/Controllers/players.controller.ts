// CORE
import { Controller, Get, Post, Body, Param, Delete, Query, NotFoundException, HttpStatus, HttpException, Patch } from "@nestjs/common";
// SWAGGER
import { ApiResponse } from "@nestjs/swagger";
// TYPES
import { ID } from "src/types";
// SERVICES
import { PlayersService } from "../../Domain/Services/players.service";
// MODELS
import { Player } from "../../Domain/Models/player.model";
import { CreatePlayerDto } from "../../Domain/DTOs/create-player.dto";
import { UpdatePlayerDto } from "../../Domain/DTOs/update-player.dto";


/**
 * Handles players requests
 */
@Controller('players')
export class PlayersController {

    constructor(
        private readonly playersService: PlayersService
    ) { }

    /**
     * Gets players list filtered by given parameters
     * 
     * @param {number} page     The subpage
     * @param {number} limit    How many entries should by fetched
     * @param {string} search   Searched phrase
     */
    @ApiResponse({ status: 200, description: 'List Players.' })
    @Get()
    async getList(
        @Query('limit') limit: number = 10,
        @Query('page') page: number,
        @Query('search') search: string,
    ): Promise<Player[]> {
        try {
            return await this.playersService.getList(limit, page, search);
        } catch {
            throw new NotFoundException('Nie znaleziono żadnych wpisów');
        }
    }

    @Get(':id')
    async getOne(
        @Param('id') id: ID
    ): Promise<Player> {
        try {
            return await this.playersService.getPlayer(id);
        } catch {
            throw new NotFoundException('Nie znaleziono wpisu o podanym id');
        }
    }

    // @UseGuards(AuthGuard)
    @Post()
    async create(
        @Body() player: CreatePlayerDto
    ): Promise<Player> {
        try {
            return await this.playersService.create(player);
        } catch {
            throw new HttpException('Nie udało się utworzyć wpisu', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @UseGuards(AuthGuard)
    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body() player: UpdatePlayerDto
    ): Promise<Player> {
        try {
            return await this.playersService.update(id, player);
        } catch {
            throw new HttpException('Nie udało się zaktualizować danych', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(
        @Param('id') id: number
    ): Promise<ID> {
        try {
            await this.playersService.delete(id);
            return id;
        } catch {
            throw new HttpException('Nie udało się usunąć wpisu', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}