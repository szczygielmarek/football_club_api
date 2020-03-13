// Core
import { Provider } from "@nestjs/common";
import { ConnectionConfig, createConnection } from "mysql";
// Interfaces
import { DATABASE_CONNECTION, DatabaseConnection } from "./";


export const createDatabaseProvider = (options: ConnectionConfig): Provider => {

    return {
        provide: DATABASE_CONNECTION,
        useFactory: async (): Promise<DatabaseConnection> => {
            const connection: DatabaseConnection = await createConnection(options);
            await connection.connect((err) => err && console.error(err));

            connection.asyncQuery = (sql: string, values?: any): Promise<any> => {
                return new Promise((resolve, reject) => {
                    connection.query(sql, values, (err, rows) => {
                        if (err) reject(err);
                        resolve(rows);
                    });
                });
            }

            return connection;
        }
    }

}