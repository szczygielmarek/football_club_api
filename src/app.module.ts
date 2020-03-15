// Core
import { Module } from '@nestjs/common';
// Config
import globalParams from './config/global.parameters';
// Modules
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { PlayersModule } from './modules/players/players.module';
// Controlers
import { AppController } from './app.controller';


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            ignoreEnvFile: true,
            load: [globalParams],
        }),
        CoreModule,
        PlayersModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule { }
