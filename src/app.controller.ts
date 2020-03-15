import { Controller, Get, HttpException, HttpStatus, Param, Res } from '@nestjs/common';

@Controller()
export class AppController {
    constructor() { }

    @Get()
    getHello(): string {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
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
