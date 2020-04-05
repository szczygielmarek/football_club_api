
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { convertToSQLDate } from '../../helpers/database.helpers';

/**
 * Converts JavaScript date value in ISO format to SQL Date format
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
                continue;

            try {
                data[prop] = convertToSQLDate(data[prop]);
            } catch {
                throw new BadRequestException('Date validation failed');
            }
        }

        return data;

    }

}
