// Core
import { Module } from "@nestjs/common";
// Controllers
import { PlayersController } from "./controllers/players.controller";
// Services
import { PlayersService } from "./services/players.service";
import { PlayersRepository } from "./repositories/players.repository";


@Module({
    controllers: [PlayersController],
    providers: [
        PlayersService,
        PlayersRepository,
    ],
})
export class PlayersModule { }