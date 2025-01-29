import { IsEmail, IsEnum, Length, IsString, IsOptional } from 'class-validator';
import { UserRole } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
	@ApiProperty()
	@IsEmail()
	@Length(4, 60)
	email: string;

	@ApiProperty()
	@IsString()
	@Length(8, 40)
	password: string;

	@ApiProperty()
	@IsString()
	@Length(4, 50)
	fullName: string;

	@ApiProperty()
	@IsOptional()
	@IsEnum(UserRole)
	role?: UserRole;
}
