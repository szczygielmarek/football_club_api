// Core
import { Module } from '@nestjs/common';
// Modules
import { DatabaseModule } from './core/database';
import { LoggerModule } from './core/log/logger.module';
import { PlayersModule } from './modules/players/players.module';
// Controlers
import { AppController } from './app.controller';


@Module({
    imports: [
        DatabaseModule.forRoot({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: Number(process.env.DB_PORT) || 3306,
        }),
        LoggerModule,
        PlayersModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule { }
