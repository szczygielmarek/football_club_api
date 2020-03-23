// Core
import { DynamicModule, Global } from '@nestjs/common';
import { ConnectionConfig } from 'mysql';
// Providers
import { createDatabaseConnectionProvider } from './providers/database.provider';


/**
 * The **@Global()** decorator makes the module global-scoped. 
 * Global modules should be registered only once, generally by the root or core module. 
 * 
 * **register** static methood requires 
 * [`ConnectionConfig`](https://www.npmjs.com/package/mysql#connection-options) 
 * options to create mysql connection.
 * 
 * Module exports a provider with token **"DATABASE_CONNECTION"**.
 */
@Global()
export class DatabaseModule {

    static register(options: ConnectionConfig): DynamicModule {
        
        const connectionProvider = createDatabaseConnectionProvider(options);

        return {
            module: DatabaseModule,
            providers: [connectionProvider],
            exports: [connectionProvider],
        }
    }

}