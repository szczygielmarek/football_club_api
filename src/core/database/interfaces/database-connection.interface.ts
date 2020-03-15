// Core
import { Connection } from "mysql";


export type DatabaseConnection = Connection & {
    asyncQuery?: (sql: string, values?: any) => Promise<any>
}  