// Core
import { Module } from '@nestjs/common';
// Config
import globalParams from './config/global.parameters';
// Modules
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { MulterModule } from '@nestjs/platform-express';
import { PlayersModule } from './modules/players/players.module';
// Controlers
import { AppController } from './app.controller';


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env', '.env.development'],
            load: [globalParams],
        }),
        CoreModule,
        MulterModule.register({
            limits: { fileSize: 2097152 }
        }),
        PlayersModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule { }
