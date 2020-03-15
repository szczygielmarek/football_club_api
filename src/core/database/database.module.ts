// Core
import { Module, DynamicModule, Global } from '@nestjs/common';
import { ConnectionConfig } from 'mysql';
// Providers
import { createDatabaseProvider } from './';


/**
 * The @Global() decorator makes the module global-scoped. 
 * Global modules should be registered only once, generally by the root or core module. 
 */
@Global()
@Module({})
export class DatabaseModule {

    static forRoot(options: ConnectionConfig): DynamicModule {
        const provider = createDatabaseProvider(options);
        return {
            module: DatabaseModule,
            providers: [provider],
            exports: [provider],
        }
    }

}