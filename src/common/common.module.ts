import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import * as providers from './providers';

const services = Object.values(providers);

@Global()
@Module({
	providers: services,
	exports: services,
})
export class CommonModule implements NestModule {
	// Global Middleware
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public configure(consumer: MiddlewareConsumer): void {
		// consumer.apply().forRoutes('*');
	}
}
