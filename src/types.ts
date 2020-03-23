export type ID = number;
export type URL = string;
/**
 * Files metadata extracted from req.body
 */
export type FilesMetadata = Record<string, Express.Multer.File[]>;
/**
 * File metadata uploaded to storage
 */
export type File = { fieldname: string; filename: string };