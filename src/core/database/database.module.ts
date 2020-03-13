// Core
import { Module, DynamicModule, Global } from '@nestjs/common';
import { ConnectionConfig } from 'mysql';
// Providers
import { createDatabaseProvider } from './';


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