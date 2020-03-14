// Types
import { ID } from "src/types";
// Models
import { Player } from "../models/player.model";
import { CreatePlayerDto } from "../dtos/create-player.dto";
import { UpdatePlayerDto } from "../dtos/update-player.dto";


/**
 * Players Repository Interface
 */
export interface PlayersRepositoryInterface {

    /**
     * Gets players list filtered by given parameters
     * 
     * @param {number} page     The subpage
     * @param {number} limit    How many entries should by fetched
     * @param {string} search   Searched phrase
     * @returns {Players[]}     Players array
     */
    getList: (limit?: number, page?: number, search?: string) => Promise<Player[]>;

    /**
     * Gets player by ID
     * 
     * @param  {ID} id
     * @returns {Player}
     */
    getOne: (id: ID) => Promise<Player>;

    /**
     * Creates new player
     * 
     * @param  {ID} id
     * @param  {CreatePlayerDto} player
     * @returns {Player}
     */
    create: (player: CreatePlayerDto) => Promise<Player>;

    /**
     * Updates player
     * 
     * @param  {ID} id
     * @param  {UpdatePlayerDto} player
     * @returns {Player}
     */
    update: (id: ID, player: UpdatePlayerDto) => Promise<Player>;

    /**
     * Deletes player
     * 
     * @param  {ID} id
     * @returns {ID}
     */
    delete: (id: ID) => Promise<ID>;

}