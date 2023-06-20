import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class RequestService {
	constructor(@Inject(REQUEST) private readonly request: Request) {}

	getRequest(): Request {
		return this.request;
	}
}
