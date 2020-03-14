// Core
import { Module } from "@nestjs/common";
// Modules
import { LoggerModule } from "src/core/log/logger.module";
// Controllers
import { PlayersController } from "./controllers/players.controller";
// Services
import { PlayersService } from "./services/players.service";
import { PlayersRepository } from "./repositories/players.repository";


@Module({
    imports: [LoggerModule],
    controllers: [PlayersController],
    providers: [
        PlayersService,
        PlayersRepository,
    ],
})
export class PlayersModule { }