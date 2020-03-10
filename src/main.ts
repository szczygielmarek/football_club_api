import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppLogger } from './logger.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: false,
    });
    
    // Logger
    app.useLogger(new AppLogger());

    // Swagger
    const options = new DocumentBuilder()
        .setTitle('Football Club API')
        .setDescription('Football Club REST API')
        .setVersion('1.0')
        .addTag('football club')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}
bootstrap();
