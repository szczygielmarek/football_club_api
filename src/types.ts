export type ID = number;
export type URL = string;
export type FilesMetadata = Record<string, Express.Multer.File[]>;
export type File = { fieldname: string; filename: string };