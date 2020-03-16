// Core
import { Module } from "@nestjs/common";
// Modules
import { DatabaseModule } from "./database";
import { StorageModule } from "./storage";
import { LoggerModule } from "./log";


@Module({
    imports: [
        DatabaseModule.register({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: Number(process.env.DB_PORT) || 3306,
        }),
        StorageModule.register({
            engine: process.env.STORAGE_ENGINE as any,
            disk: {
                rootDir: process.env.ROOT_FILES,
            },
            s3: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            }
        }),
        LoggerModule,
    ],
    exports: [
        DatabaseModule,
        LoggerModule,
    ]
})
export class CoreModule { }