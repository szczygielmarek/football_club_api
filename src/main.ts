// ENV config
import { config } from 'dotenv';
config();

// Core
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
// Modules
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';


async function bootstrap() {
    
    const app = await NestFactory.create(AppModule, {});

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
