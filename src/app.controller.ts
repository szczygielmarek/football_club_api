import { Controller, Get, HttpException, HttpStatus, Param, Res } from '@nestjs/common';
import { LoggerService } from './core/log/logger.service';

@Controller()
export class AppController {
    constructor(private readonly loggerService: LoggerService) { 
        this.loggerService.setContext('APP');
    }

    @Get()
    getHello(): string {
        this.loggerService.log('Info example');

        try {
            this.loggerService.warn('Warning example');
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        } catch(e) {
            this.loggerService.error(`[${e.status}] Error example: ${e.message}`, e.stack, 'HHeeb');
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    // TODO: fix static files
    @Get('files/:fileName')
    getFiles(@Param('fileName') fileName: string, @Res() res: any): any {
        return res.sendFile(fileName, { root: 'uploads' });
    }

    @Get('files/players/:fileName')
    getPlayerFiles(@Param('fileName') fileName: string, @Res() res: any): any {
        return res.sendFile(fileName, { root: 'uploads/players' });
    }

}
