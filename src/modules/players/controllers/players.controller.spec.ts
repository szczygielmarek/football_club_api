import { Test } from '@nestjs/testing';
import { PlayersController } from './players.controller';
import { PlayersService } from './../services/players.service';
import { Player } from '../models/player.model';
import { CreatePlayerDto } from '../dtos/create-player.dto';
import { UpdatePlayerDto } from '../dtos/update-player.dto';
import { ID } from 'src/types';


describe('Players Controller', () => {
    let playersController: PlayersController;
    // mock data
    let playersService: Partial<PlayersService> = {
        getList: () => null,
        getOne: () => null,
        create: () => null,
        update: () => null,
        delete: () => null,
    };
    const player: Player & CreatePlayerDto & UpdatePlayerDto = {
        id: 1,
        name: 'name',
        surname: 'surname',
        date_of_birth: '2000-01-01',
    };

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [PlayersService],
            controllers: [PlayersController]
        })
            .overrideProvider(PlayersService)
            .useValue(playersService)
            .compile();

        playersController = moduleRef.get<PlayersController>(PlayersController);
    });

    describe('-- getList', () => {
        const players: Player[] = [player];
        it('should call the service `getList` function with 3 arguments', async () => {
            const mock: jest.Mock = jest.fn();
            jest.spyOn(playersService, 'getList').mockImplementation(mock);
            await playersController.getList(20, 2, 'test');
            expect(mock).toBeCalledWith(20, 2, 'test');
        });
        it('should return an array of players', async () => {
            const mock: () => Promise<Player[]> = () => new Promise(resolve => resolve(players));
            jest.spyOn(playersService, 'getList').mockImplementation(mock);
            const result = await playersController.getList();
            expect(result).toBe(players);
        });
        it('should give a 404 error status when an error occurs', async () => {
            const mock: () => Promise<Player[]> = () => new Promise((_, reject) => reject());
            jest.spyOn(playersService, 'getList').mockImplementation(mock);
            try {
                const result = await playersController.getList();
                expect(result).not.toBe(players);
            } catch (e) {
                expect(e.status).toEqual(404);
            }
        });
    });

    describe('-- getOne', () => {
        const ID: ID = 1;
        it('should pass a `ID` to the service `getOne` function', async () => {
            const mock: jest.Mock = jest.fn();
            jest.spyOn(playersService, 'getOne').mockImplementation(mock);
            await playersController.getOne(ID);
            expect(mock).toBeCalledWith(ID);
        });
        it('should return a player', async () => {
            const mock: () => Promise<Player> = () => new Promise(resolve => resolve(player));
            jest.spyOn(playersService, 'getOne').mockImplementation(mock);
            const result = await playersController.getOne(ID);
            expect(result).toBe(player);
        });
        it('should give a 404 error status when an error occurs', async () => {
            const mock: () => Promise<Player> = () => new Promise((_, reject) => reject());
            jest.spyOn(playersService, 'getOne').mockImplementation(mock);
            try {
                const result = await playersController.getOne(ID);
                expect(result).not.toBe(player);
            } catch (e) {
                expect(e.status).toEqual(404);
            }
        });
    });

    describe('-- create', () => {
        const newPlayer: CreatePlayerDto = player;
        it('should pass a `newPlayer` object to the service `create` function', async () => {
            const mock: jest.Mock = jest.fn();
            jest.spyOn(playersService, 'create').mockImplementation(mock);
            await playersController.create(newPlayer);
            expect(mock).toBeCalledWith(newPlayer, undefined);
        });
        it('should return a new player', async () => {
            const mock: () => Promise<Player> = () => new Promise(resolve => resolve(player));
            jest.spyOn(playersService, 'create').mockImplementation(mock);
            const result = await playersController.create(newPlayer);
            expect(result).toBe(player);
        });
        it('should give a 500 error status when an error occurs', async () => {
            const mock: () => Promise<Player> = () => new Promise((_, reject) => reject());
            jest.spyOn(playersService, 'create').mockImplementation(mock);
            try {
                const result = await playersController.create(newPlayer);
                expect(result).not.toBe(player);
            } catch (e) {
                expect(e.status).toEqual(500);
            }
        });
    });

    describe('-- update', () => {
        const updatedPlayer: UpdatePlayerDto = player;
        it('should pass a `ID` and an `updatedPlayer` object to the service `update` function', async () => {
            const mock: jest.Mock = jest.fn();
            jest.spyOn(playersService, 'update').mockImplementation(mock);
            await playersController.update(1, updatedPlayer);
            expect(mock).toBeCalledWith(1, updatedPlayer, undefined);
        });
        it('should return an updated player', async () => {
            const mock: () => Promise<Player> = () => new Promise(resolve => resolve(player));
            jest.spyOn(playersService, 'update').mockImplementation(mock);
            const result = await playersController.update(1, updatedPlayer);
            expect(result).toBe(player);
        });
        it('should give a 500 error status when an error occurs', async () => {
            const mock: () => Promise<Player> = () => new Promise((_, reject) => reject());
            jest.spyOn(playersService, 'update').mockImplementation(mock);
            try {
                const result = await playersController.update(1, updatedPlayer);
                expect(result).not.toBe(player);
            } catch (e) {
                expect(e.status).toEqual(500);
            }
        });
    });

    describe('-- delete', () => {
        const ID: ID = 1;
        it('should pass a `ID` to the service `delete` function', async () => {
            const mock: jest.Mock = jest.fn();
            jest.spyOn(playersService, 'delete').mockImplementation(mock);
            await playersController.delete(ID);
            expect(mock).toBeCalledWith(ID);
        });
        it('should return the ID of the removed player', async () => {
            const mock: () => Promise<ID> = () => new Promise(resolve => resolve(1));
            jest.spyOn(playersService, 'delete').mockImplementation(mock);
            const result = await playersController.delete(ID);
            expect(result).toBe(ID);
        });
        it('should give a 500 error status when an error occurs', async () => {
            const mock: () => Promise<ID> = () => new Promise((_, reject) => reject());
            jest.spyOn(playersService, 'delete').mockImplementation(mock);
            try {
                const result = await playersController.delete(ID);
                expect(result).not.toBe(1);
            } catch (e) {
                expect(e.status).toEqual(500);
            }
        });
    });

});