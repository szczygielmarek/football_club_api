import { Injectable, Scope, Logger } from '@nestjs/common';
import * as winston from 'winston';
import * as Transport from 'winston-transport';
import * as WinstonGraylog2 from 'winston-graylog2';
// const Log2gelf = require('winston-log2gelf');
import * as path from 'path';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger extends Logger {

    /**
     * Winston Logger object
     * 
     * Documantation: https://github.com/winstonjs/winston
     */
    private _logger: winston.Logger;

    constructor() {
        super();

        this._logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            exitOnError: false,
            silent: false,
            transports: this._setTransports(),
        });
    }

    /**
     * Set transports for winston logger
     * 
     * @returns {Transport[]}
     */
    private _setTransports(): Transport[] {

        const transports: Transport[] = [
            new WinstonGraylog2({
                name: 'Graylog',
                level: 'error',
                silent: false,
                handleExceptions: true,
                graylog: {
                    servers: [{ host: 'localhost', port: 12201 }],
                    bufferSize: 262144
                },
                staticMeta: {
                    env: 'prod'
                },
            }),
        ];

        if (process.env.NODE_ENV !== 'production') {

            transports.push(
                new winston.transports.File({
                    dirname: path.join(__dirname, './../log/error/'),
                    filename: 'error.log',
                    level: 'error',
                    handleExceptions: true,
                }),
            )

        }

        return transports;
    }

    /** @inheritdoc */
    public log(message: string): void {
        this._logger.log({
            level: 'info',
            message: message,
        });

        super.log(message);
    }

    /** @inheritdoc */
    public error(message: string, trace?: string, hash?: string): void {
        const test = this._logger.log({
            level: 'error',
            message: message,
            trace: trace,
            date: new Date(),
            context: this.context,
            hash: hash,
        });

        super.error(message, trace, this.context);
    }

    /** @inheritdoc */
    public warn(message: string): void {
        this._logger.log({
            level: 'warn',
            message: message,
        });

        super.warn(message);
    }

}