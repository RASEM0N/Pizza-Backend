import {
	createParamDecorator,
	ExecutionContext,
	UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';

export const CurrentUser = createParamDecorator((_, ctx: ExecutionContext): User => {
	const user = ctx.switchToHttp().getRequest()['user'];

	if (!user) {
		throw new UnauthorizedException();
	}

	return user;
});
