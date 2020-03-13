// Core
import { Module } from "@nestjs/common";
// Modules
import { LoggerModule } from "src/logger.module";
// Controllers
import { PlayersController } from "./Application/Controllers/players.controller";
// Services
import { PlayersService } from "./Domain/Services/players.service";


@Module({
    imports: [LoggerModule],
    controllers: [PlayersController],
    providers: [PlayersService],
})
export class PlayersModule { }