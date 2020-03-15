// Core
import { Provider, InternalServerErrorException } from "@nestjs/common";
import { ConnectionConfig, createConnection } from "mysql";
// Tokens
import { DATABASE_CONNECTION } from './../constants';
// Interfaces
import { DatabaseConnection } from "./../interfaces/database-connection.interface";
// Providers
import { LoggerService } from "../../log/logger.service";


export const createDatabaseConnectionProvider = (options: ConnectionConfig): Provider => {

    return {
        provide: DATABASE_CONNECTION,
        useFactory: async (logger: LoggerService): Promise<DatabaseConnection> => {

            const connection: DatabaseConnection = createConnection(options);
            connection.connect((err) => {
                if (err) {
                    logger.error('DB connection error', err.stack, 'DBar0');
                    throw new InternalServerErrorException();
                }
            });

            connection.asyncQuery = (sql: string, values?: any): Promise<any> => {
                return new Promise((resolve, reject) => {
                    connection.query(sql, values, (err, rows) => {
                        if (err) {
                            logger.error(`DB Query Error. SQL: ${sql}, Values: ${values}`, err.stack, 'BCzz1');
                            reject(err);
                        }
                        resolve(rows);
                    });
                });
            }

            return connection;
        },
        inject: [LoggerService]
    }

}