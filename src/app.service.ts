import { Injectable } from '@nestjs/common';
import { AppLogger } from './logger.service';

@Injectable()
export class AppService {

    constructor(private readonly logger: AppLogger) {
        this.logger.setContext('app.service.ts');
    }

    getHello(): string {
        return 'Hello World!!!';
    }
}
