// Core
import { Controller, Get, Post, Body, Param, Delete, Query, NotFoundException, HttpStatus, HttpException, Patch, ParseIntPipe, UsePipes } from "@nestjs/common";
// Docs
import { ApiResponse } from "@nestjs/swagger";
// Types
import { ID } from "src/types";
// Pipes
import { ConvertDatePipe } from "src/shared/pipes/convert-date.pipe";
// Services
import { PlayersService } from "../services/players.service";
// Models
import { Player } from "../models/player.model";
import { CreatePlayerDto } from "../dtos/create-player.dto";
import { UpdatePlayerDto } from "../dtos/update-player.dto";


/**
 * Handles players requests
 */
@Controller('players')
export class PlayersController {

    constructor(private readonly playersService: PlayersService) { }

    /**
     * Gets players list filtered by given parameters
     * 
     * @param {number} page     The subpage
     * @param {number} limit    How many entries should by fetched
     * @param {string} search   Searched phrase
     */
    @Get()
    @ApiResponse({ status: 200, description: 'List players.' })
    async getList(
        @Query('limit') limit: number,
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
    @ApiResponse({ status: 200, description: 'Get player by ID.' })
    async getOne(@Param('id', new ParseIntPipe()) id: ID): Promise<Player> {
        try {
            return await this.playersService.getOne(id);
        } catch {
            throw new NotFoundException('Nie znaleziono wpisu o podanym id');
        }
    }

    // @UseGuards(AuthGuard)
    @Post()
    @ApiResponse({ status: 201, description: 'Create new player.' })
    @UsePipes(new ConvertDatePipe(['date_of_birth', 'debut']))
    async create(@Body() player: CreatePlayerDto): Promise<Player> {
        try {
            return await this.playersService.create(player);
        } catch {
            throw new HttpException('Nie udało się utworzyć wpisu', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @UseGuards(AuthGuard)
    @Patch(':id')
    @ApiResponse({ status: 200, description: 'Update player data.' })
    @UsePipes(new ConvertDatePipe(['date_of_birth', 'debut']))
    async update(@Param('id', new ParseIntPipe()) id: ID, @Body() player: UpdatePlayerDto): Promise<Player> {
        try {
            return await this.playersService.update(id, player);
        } catch {
            throw new HttpException('Nie udało się zaktualizować danych', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @UseGuards(AuthGuard)
    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Delete player.' })
    async delete(@Param('id', new ParseIntPipe()) id: ID): Promise<ID> {
        try {
            await this.playersService.delete(id);
            return id;
        } catch {
            throw new HttpException('Nie udało się usunąć wpisu', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}