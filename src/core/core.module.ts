// Core
import { Module } from "@nestjs/common";
// Modules
import { DatabaseModule } from "./database";
import { LoggerModule } from "./log/logger.module";


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
    ],
    exports: [
        DatabaseModule,
        LoggerModule,
    ]
})
export class CoreModule { }