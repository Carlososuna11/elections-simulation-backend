import { repl } from '@nestjs/core';

import { AppModule } from './app.module';

/**
 * https://docs.nestjs.com/recipes/repl
 */
async function bootstrap(): Promise<void> {
	await repl(AppModule);
}

bootstrap();
