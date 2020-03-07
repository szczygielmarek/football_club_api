import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppLogger } from './logger.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: false,
    });
    app.useLogger(new AppLogger());
    await app.listen(3000);
}
bootstrap();
