import { Module, Global } from '@nestjs/common';
import { LoggerService } from './services/logger.service';

/**
 * Module that exports `LoggerService`
 * 
 * The @Global() decorator makes the module global-scoped. 
 * Global modules should be registered only once, generally by the root or core module. 
 * 
 * @exports [[LoggerService]]
 */
@Global()
@Module({
    providers: [LoggerService],
    exports: [LoggerService],
})
export class LoggerModule { }