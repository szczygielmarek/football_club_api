import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerModule } from './logger.module';
import { PlayersModule } from './Modules/Players/players.module';

@Module({
    imports: [
        LoggerModule,
        PlayersModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule { }
