import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';

import { CommonModule, AllExceptionsFilter } from './common';
import { configuration } from './config';
import { BaseModule } from './base';
import { StudentsModule } from './student';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Module({
	imports: [
		// Configuration
		// https://docs.nestjs.com/techniques/configuration
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration],
		}),
		// Static Folder
		// https://docs.nestjs.com/recipes/serve-static
		// https://docs.nestjs.com/techniques/mvc
		ServeStaticModule.forRoot({
			rootPath: `${__dirname}/../public`,
			serveRoot: '/public/',
		}),
		// Service Modules
		CommonModule,
		BaseModule,
		StudentsModule,
		// Global
		// Module Router
		// https://docs.nestjs.com/recipes/router-module
	],
	providers: [
		// Global Filter, Exception check
		{ provide: APP_FILTER, useClass: AllExceptionsFilter },
		// Global Pipe, Validation check
		// https://docs.nestjs.com/pipes#global-scoped-pipes
		// https://docs.nestjs.com/techniques/validation
		{
			provide: APP_PIPE,
			useValue: new ValidationPipe({
				// disableErrorMessages: true,
				transform: true, // transform object to DTO class
				whitelist: true,
			}),
		},
		// REQUEST URL BASE
		{
			provide: 'HOST',
			useFactory: (req: Request) => {
				const host = `${req.protocol}://${req.get('Host')}`;
				return host;
			},
			inject: [REQUEST],
		},
	],
})
export class AppModule {}
