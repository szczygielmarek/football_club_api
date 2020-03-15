import { FilesMetadata, File } from "src/types";

export interface StorageEngine {
 
    /**
     * Specifies the subfolder into which files will be uploaded
     * 
     * @param  {string} path
     */
    setDestination: (path: string) => void,

    /**
     * Uploads files
     * 
     * @param  {FilesMetadata} files        Files metadata extracted from req.body
     * @param  {string[]} nameComponents    Parts from which the file name will be constructed
     */
    upload: (files: FilesMetadata, nameComponents: string[]) => Promise<File[]>,
}