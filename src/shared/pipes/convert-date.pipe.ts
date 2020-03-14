
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { convertToSQLDate } from 'src/helpers/database.helpers';

/**
 * Converts JavaScript Date to SQL Date format 
 */
@Injectable()
export class ConvertDatePipe implements PipeTransform<object, object> {

    /**
     * 
     * @param columns   An array of column names that should be transformed
     */
    constructor(private columns: string[]) { }

    transform(data: object, metadata: ArgumentMetadata): object {

        for (let prop of this.columns) {
            if(!(prop in data)) 
                throw new BadRequestException('Column with the given name does not exist'); 

            try {
                data[prop] = convertToSQLDate(data[prop]);
            } catch {
                throw new BadRequestException('Date validation failed');
            }
        }

        return data;

    }

}
