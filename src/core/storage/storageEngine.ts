// TODO:
// https://github.com/expressjs/multer/blob/master/StorageEngine.md
// https://medium.com/better-programming/nestjs-file-uploading-using-multer-f3021dfed733
// https://medium.com/@shamnad.p.s/image-upload-to-aws-s3-using-nestjs-and-typescript-b32c079963e1
// https://www.npmjs.com/package/nestjs-multer-extended
import * as multer from 'multer';
import { extname } from 'path';

/**
 * @param  {string} destination     Used to determine within which folder the uploaded files should be stored
 * @param  {string[]} names         Body request properties used to determine what the file should be named inside the folder
 * @returns multer.StorageEngine
 */
export const storageEngine = (destination: string, names: string[]): multer.StorageEngine => {
    return multer.diskStorage({
        destination: `./uploads/${destination}`,
        filename: (req: any, file: Express.Multer.File, cb: any) => {
            
            let fileName: string = '';
            for (let name of names) {
                fileName += String(req.body[name]).toLowerCase() + '_';
            }
            fileName += new Date().getTime();

            return cb(null, `${fileName}${extname(file.originalname)}`);
            
        },
    });
}