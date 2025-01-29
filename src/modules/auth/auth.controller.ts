import { Body, Controller, Get, Post, Query, Response, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorator/auth-user.decorator';
import { JwtAuthGuard } from './guard/auth-jwt.guard';
import { LoginDto, RegisterDto } from './dto/login.dto';
import { Response as ExpResponse } from 'express';
import { User } from '@prisma/client';
import { clearAuthToken, setAuthToken } from '@/modules/auth/lib/cookie';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('me')
	@UseGuards(JwtAuthGuard)
	me(@CurrentUser() user: User) {
		return user;
	}

	@Post('register')
	register(@Body() dto: RegisterDto) {
		return this.authService.register(dto);
	}

	@Post('login')
	async login(@Response() response: ExpResponse, @Body() dto: LoginDto) {
		const { user, token } = await this.authService.login(dto);
		setAuthToken(response, token);
		response.json(user);
	}

	@Post('logout')
	logout(@Response() response: ExpResponse) {
		clearAuthToken(response);
		response.json();
	}

	@Post('verify')
	async verify(
		@Response() response: ExpResponse,
		@Query('code') code: string,
	): Promise<void> {
		await this.authService.verify(code);
		response.redirect('/?verified');
	}
}
