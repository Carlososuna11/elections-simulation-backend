import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Logger } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

	catch(exception: unknown, host: ArgumentsHost): void {
		// In certain situations `httpAdapter` might not be available in the
		// constructor method, thus we should resolve it here.
		const { httpAdapter } = this.httpAdapterHost;

		const ctx = host.switchToHttp();

		const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

		const responseBody =
			exception instanceof HttpException
				? exception.getResponse()
				: { statusCode: httpStatus, message: 'Internal Server Error' };

		// console all exception traceback
		Logger.error(exception instanceof Error ? exception.stack : String(exception), 'Exception Handler');

		httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
	}
}
