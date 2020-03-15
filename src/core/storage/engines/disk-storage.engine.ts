// Core
import * as fs from 'fs';
import { extname } from 'path';
import { Injectable, Inject } from "@nestjs/common";
// Types
import { FilesMetadata, File } from "src/types";
// Tokens
import { STORAGE_OPTIONS } from '../constants';
// Interfaces
import { StorageEngine } from "../interfaces/storage-engine.interface";
// Providers
import { LoggerService } from "src/core/log/logger.service";


/**
 * Dist storage Engine
 */
@Injectable()
export class DiskStorageEngine implements StorageEngine {

    /**
     * Directory where files should be uploaded
     */
    private _destination: string;

    constructor(
        private logger: LoggerService,
        @Inject(STORAGE_OPTIONS) 
        private options,
    ) { }

    /** @inheritdoc */
    setDestination(path: string): void {
        this._destination = path;
    }

    /** @inheritdoc */
    upload(files: FilesMetadata, nameComponents: string[]): Promise<File[]> {

        // TODO: extend it! (file size, exceptions, etc.)
        // TODO: refactor this function

        // TODO: make private function _setName
        let newFileName: string = nameComponents.join('_').toLowerCase(); 
        newFileName = `${newFileName}_${new Date().getTime()}`;

        const promises: Promise<File>[] = [];

        for (const key in files) {
            for (const file of files[key]) {

                const fieldname = file['fieldname'];
                const filename = `${newFileName}${extname(file['originalname'])}`
                const path = `${this.options.rootDir}/${this._destination}/${filename}`;

                promises.push(

                    // TODO: make private function _writeFile
                    new Promise((resolve, reject) => {
                        fs.writeFile(path, file.buffer, (err) => {

                            if (err) {
                                this.logger.error('Failed to save files', err.stack, 'UFva2');
                                reject(err);
                            };

                            this.logger.log('The file has been saved!');
                            resolve({
                                fieldname,
                                filename
                            });

                        });
                    })

                );

            }
        }

        return Promise.all(promises);

    }

}