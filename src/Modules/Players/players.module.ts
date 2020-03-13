// CORE
import { Module } from "@nestjs/common";
// MODULES
import { LoggerModule } from "src/logger.module";
// CONTROLLERS
import { PlayersController } from "./Application/Controllers/players.controller";
// SERVICES
import { PlayersService } from "./Domain/Services/players.service";


@Module({
    imports: [LoggerModule],
    controllers: [PlayersController],
    providers: [PlayersService],
})
export class PlayersModule { }