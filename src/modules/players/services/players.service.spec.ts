import { PlayersService } from "./players.service";
import { Test } from "@nestjs/testing";
import { PlayersController } from "../controllers/players.controller";
import { ConfigService } from "@nestjs/config";
import { PlayersRepository } from "../repositories/players.repository";
import { STORAGE_ENGINE, StorageEngine } from "./../../../core/storage";
import { Player } from "../models/player.model";
import { CreatePlayerDto } from "../dtos/create-player.dto";
import { UpdatePlayerDto } from "../dtos/update-player.dto";
import { ID, File } from "src/types";

describe('Players Service', () => {
    let playersService: PlayersService;
    let configService: Partial<ConfigService> = {
        get: () => null,
    }
    let storageEngine: Partial<StorageEngine> = {
        setDestination: () => null,
        upload: () => null,
    }
    let playersRepository: Partial<PlayersRepository> = {
        getList: () => null,
        getOne: () => null,
        create: () => null,
        update: () => null,
        delete: () => null,
    }
    const player: Player & CreatePlayerDto & UpdatePlayerDto = {
        id: 1,
        name: 'name',
        surname: 'surname',
        date_of_birth: '2000-01-01',
    };

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                PlayersService,
                PlayersRepository,
                ConfigService,
                { provide: STORAGE_ENGINE, useValue: storageEngine }
            ],
            controllers: [PlayersController]
        })
            .overrideProvider(ConfigService)
            .useValue(configService)
            .overrideProvider(PlayersRepository)
            .useValue(playersRepository)
            .compile();

        playersService = moduleRef.get<PlayersService>(PlayersService);
    });

    describe('-- getList', () => {
        it('should set `limit` to the default number when the `page` argument is passed', async () => {
            const configGetMock = () => 10;
            jest.spyOn(configService, 'get').mockImplementation(configGetMock);
            const repositoryGetListMock = jest.fn();
            jest.spyOn(playersRepository, 'getList').mockImplementation(repositoryGetListMock);

            await playersService.getList(undefined, 2); // limit is undefined bud page is passed
            expect(repositoryGetListMock).toBeCalledWith(10, 2, undefined);
        });
        it('should pass 3 arguments to repository `getList` function', async () => {
            const repositoryGetListMock = jest.fn();
            jest.spyOn(playersRepository, 'getList').mockImplementation(repositoryGetListMock);

            await playersService.getList(12, 2, 'text');
            expect(repositoryGetListMock).toBeCalledWith(12, 2, 'text');
        });
        it('should return an array of players', async () => {
            const players: Player[] = [player];
            const mock: () => Promise<Player[]> = () => new Promise(resolve => resolve(players));
            jest.spyOn(playersRepository, 'getList').mockImplementation(mock);
            const result = await playersService.getList();
            expect(result).toStrictEqual(players);
        });
    });

    describe('-- getOne', () => {
        const ID: ID = 1;
        it('should pass a `ID` to the repository `getOne` function', async () => {
            const mock: jest.Mock = jest.fn();
            jest.spyOn(playersRepository, 'getOne').mockImplementation(mock);
            await playersService.getOne(ID);
            expect(mock).toBeCalledWith(ID);
        });
        it('should return a `player` data based on the given `id`', async () => {
            const mock: () => Promise<Player> = () => new Promise(resolve => resolve(player));
            jest.spyOn(playersRepository, 'getOne').mockImplementation(mock);
            const result = await playersService.getOne(ID);
            expect(result).toBe(player);
        });
    });

    describe('-- create', () => {
        const newPlayer: CreatePlayerDto = player;
        const storageUploadMock = (): Promise<File[]> => new Promise(resolve => resolve([{
            fieldname: 'profile_image',
            filename: 'profile.jpg',
        }, {
            fieldname: 'cover_image',
            filename: 'cover.jpg',
        }]));
        it('should pass 2 arguments to storage `upload` function when `files` exists', async () => {
            const spy = jest.spyOn(storageEngine, 'upload').mockImplementation(storageUploadMock);
            await playersService.update(1, newPlayer, { 'profile_image': [] });
            expect(spy).toBeCalledWith({ 'profile_image': [] }, [newPlayer.name, newPlayer.surname]);
        });
        it('should add uploaded files metadata to `player` object', async () => {
            jest.spyOn(storageEngine, 'upload').mockImplementation(storageUploadMock);
            const repositoryCreateMock = jest.fn();
            jest.spyOn(playersRepository, 'create').mockImplementation(repositoryCreateMock);

            await playersService.create(newPlayer, {});
            expect(repositoryCreateMock).toBeCalledWith({ ...newPlayer, profile_image: 'profile.jpg', cover_image: 'cover.jpg' });
        });
        it('should return the newly created `player` data', async () => {
            const mock: () => Promise<Player> = () => new Promise(resolve => resolve(player));
            jest.spyOn(playersRepository, 'create').mockImplementation(mock);
            const result = await playersService.create(newPlayer);
            expect(result).toBe(player);
        });
    });

    describe('-- update', () => {
        const updatedPlayer: UpdatePlayerDto = player;
        const storageUploadMock = (): Promise<File[]> => new Promise(resolve => resolve([{
            fieldname: 'profile_image',
            filename: 'profile.jpg',
        }, {
            fieldname: 'cover_image',
            filename: 'cover.jpg',
        }]));
        it('should pass 2 arguments to storage `upload` function when `files` exists', async () => {
            const spy = jest.spyOn(storageEngine, 'upload').mockImplementation(storageUploadMock);
            await playersService.update(1, updatedPlayer, { 'profile_image': [] });
            expect(spy).toBeCalledWith({ 'profile_image': [] }, [updatedPlayer.name, updatedPlayer.surname]);
        });
        it('should add uploaded files metadata to `player` object', async () => {
            jest.spyOn(storageEngine, 'upload').mockImplementation(storageUploadMock);
            const repositoryUpdateMock = jest.fn();
            jest.spyOn(playersRepository, 'update').mockImplementation(repositoryUpdateMock);

            await playersService.update(1, updatedPlayer, {});
            expect(repositoryUpdateMock).toBeCalledWith(1, { ...updatedPlayer, profile_image: 'profile.jpg', cover_image: 'cover.jpg' });
        });
        it('should return the updated `player` data', async () => {
            const mock: () => Promise<Player> = () => new Promise(resolve => resolve(player));
            jest.spyOn(playersRepository, 'update').mockImplementation(mock);
            const result = await playersService.update(1, updatedPlayer);
            expect(result).toBe(player);
        });
    });

    describe('-- delete', () => {
        const ID: ID = 1;
        it('should pass a `ID` to the repository `delete` function', async () => {
            const mock: jest.Mock = jest.fn();
            jest.spyOn(playersRepository, 'delete').mockImplementation(mock);
            await playersService.delete(ID);
            expect(mock).toBeCalledWith(ID);
        });
        it('should return the ID of the removed player', async () => {
            const mock: () => Promise<ID> = () => new Promise(resolve => resolve(1));
            jest.spyOn(playersRepository, 'delete').mockImplementation(mock);
            const result = await playersService.delete(ID);
            expect(result).toBe(ID);
        });
    });

});