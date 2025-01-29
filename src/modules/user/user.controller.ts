import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update.dto';
import { JwtAuthGuard } from '@/modules/auth/guard/auth-jwt.guard';
import { CurrentUser } from '@/modules/auth/decorator/auth-user.decorator';

// @TODO создание аккаунта в другом месте - на подумать

@ApiTags('User')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UseGuards(JwtAuthGuard)
	@Put()
	update(@CurrentUser() user: User, @Body() dto: UpdateUserDto): Promise<User> {
		return this.userService.update(user.id, dto);
	}
}
