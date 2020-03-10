import { Module } from '@nestjs/common';
import { AppLogger } from './logger.service';

/**
 * Module that exports `AppLogger`
 * 
 * @exports [[AppLogger]]
 */
@Module({
    providers: [AppLogger],
    exports: [AppLogger],
})
export class LoggerModule { }