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
	app.enableCors({ origin: [process.env.FRONTEND_URL], credentials: true });
	app.use(cookieParser());
	app.use(morgan('dev'));
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
		}),
	);

	SwaggerModule.setup('api/docs', app, () =>
		SwaggerModule.createDocument(
			app,
			new DocumentBuilder().setTitle('Pizza | Api documentation').build(),
		),
	);

	await app.listen(process.env.PORT);
}

bootstrap();
