import {
	BadRequestException,
	createParamDecorator,
	ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';

type Data = string | { name: string; canEmpty?: boolean };

export const Cookie = createParamDecorator((data: Data, ctx: ExecutionContext) => {
	const name = typeof data === 'string' ? data : data.name;
	const canEmpty = typeof data === 'string' ? false : (data.canEmpty ?? false);

	const value = ctx.switchToHttp().getRequest<Request>().cookies[name];

	if (!value && !canEmpty) {
		throw new BadRequestException(`${data} cookie is empty`);
	}

	return value;
});
