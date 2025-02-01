import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '@/core/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import * as process from 'process';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('api');
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
		}),
	);

	// https://docs.nestjs.com/techniques/cookies#use-with-express-default
	app.use(cookieParser());

	// https://github.com/expressjs/morgan
	app.use(morgan('dev'));

	app.enableCors({
		// поддержка кукисов
		credentials: true,
		origin: [process.env.FRONTEND_URL],
	});

	// https://docs.nestjs.com/openapi/introduction
	SwaggerModule.setup('api/docs', app, () =>
		SwaggerModule.createDocument(
			app,
			new DocumentBuilder().setTitle('Pizza | Api documentation').build(),
		),
	);

	await app.listen(process.env.PORT);
}

bootstrap();
