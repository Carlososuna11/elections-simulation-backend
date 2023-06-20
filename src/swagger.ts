import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * https://docs.nestjs.com/recipes/swagger
 */
export async function setupSwagger(app: INestApplication): Promise<void> {
	const options = new DocumentBuilder()
		.setTitle('Business Rules Engine API')
		.setDescription('A Typescript rule engine where rules are defined in JSON format.')
		.setVersion('1.0.0')
		.build();
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('api', app, document);
}
