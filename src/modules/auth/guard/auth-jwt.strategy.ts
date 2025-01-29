import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '@/modules/user/user.service';
import { getAuthToken } from '../lib/cookie';

// https://docs.nestjs.com/recipes/passport#implementing-passport-jwt
@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy, 'jwt-auth') {
	constructor(
		private readonly userService: UserService,
		private readonly configService: ConfigService,
	) {
		const secret = configService.get('JWT_SECRET');
		const jwtCookie = ExtractJwt.fromExtractors([getAuthToken]);

		// @TODO
		// @ts-ignore
		super({ jwtFromRequest: jwtCookie, secretOrKey: secret });
	}

	async validate(jwtPayload: { userId: number }): Promise<User> {
		const user = await this.userService.get(jwtPayload.userId);

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
