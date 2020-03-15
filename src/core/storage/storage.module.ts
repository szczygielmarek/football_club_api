// Core
import { DynamicModule, Provider, Global } from "@nestjs/common";
// Constants
import { STORAGE_OPTIONS, STORAGE_ENGINE } from "./constants";
// Interfaces
import { StorageOptions } from "./interfaces/storage-options.interface";
// Providers
import { ConfigService } from "@nestjs/config";
import { DiskStorageEngine } from "./engines/disk-storage.engine";
import { S3StorageEngine } from "./engines/aws-s3-storage.eingine";


/**
 * The **@Global()** decorator makes the module global-scoped. 
 * Global modules should be registered only once, generally by the root or core module. 
 * 
 * Module exports provider with token **"STORAGE_ENGINE"**.
 */
@Global()
export class StorageModule {
    
    /**
     * Register `DynamicModule` with given storage engine (defalut engine is `disk`)
     * 
     * @param  {StorageOptions} options
     * @returns [[DynamicModule]]
     */
    static register(options: StorageOptions): DynamicModule {

        let storageProvider: Provider;
        let storageOptions: object;

        switch(options.engine) {
            case 's3':
                storageProvider = S3StorageEngine;
                storageOptions = options.s3;
                break;
            case 'disk':
            default:
                storageProvider = DiskStorageEngine;
                storageOptions = options.disk;
        }

        return {
            module: StorageModule,
            imports: [ConfigService],
            providers: [
                {
                    provide: STORAGE_OPTIONS,
                    useValue: storageOptions,
                },
                {
                    provide: STORAGE_ENGINE,
                    useClass: storageProvider,
                },
            ],
            exports: [STORAGE_ENGINE]
        }
    }

}