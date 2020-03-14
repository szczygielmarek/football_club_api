// Core
import { Controller, Get, Post, Body, Param, Delete, Query, NotFoundException, HttpStatus, HttpException, Patch, ParseIntPipe, UsePipes, UseInterceptors, UploadedFiles } from "@nestjs/common";
import { FileFieldsInterceptor } from '@nestjs/platform-express';
// Docs
import { ApiResponse } from "@nestjs/swagger";
// Types
import { ID, Files } from "src/types";
// Helpers
import { storage } from "src/helpers/storage.helpers";
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
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'profile_image', maxCount: 1 },
        { name: 'cover_image', maxCount: 1 },
    ], { storage: storage('players', ['name', 'surname']) }))
    async create(
        @Body() player: CreatePlayerDto,
        @UploadedFiles() files: Files,
    ): Promise<Player> {
        
        try {
            return await this.playersService.create(player, files);
        } catch {
            throw new HttpException('Nie udało się utworzyć wpisu', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    // @UseGuards(AuthGuard)
    @Patch(':id')
    @ApiResponse({ status: 200, description: 'Update player data.' })
    @UsePipes(new ConvertDatePipe(['date_of_birth', 'debut']))
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'profile_image', maxCount: 1 },
        { name: 'cover_image', maxCount: 1 },
    ], { storage: storage('players', ['name', 'surname']) }))
    async update(
        @Param('id', new ParseIntPipe()) id: ID,
        @Body() player: UpdatePlayerDto,
        @UploadedFiles() files: Files,
    ): Promise<Player> {
        
        try {
            return await this.playersService.update(id, player, files);
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