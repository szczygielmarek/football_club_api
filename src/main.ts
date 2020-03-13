// CORE
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// MODULES
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
// SERVICES
import { AppLogger } from './logger.service';


async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: false,
    });

    // Logger
    app.useLogger(new AppLogger());

    // Validation
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }));

    // Swagger
    const options = new DocumentBuilder()
        .setTitle('Football Club API')
        .setDescription('Football Club REST API')
        .setVersion('1.0')
        .addTag('football club')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    // Watcher
    await app.listen(3000);

}

bootstrap();
