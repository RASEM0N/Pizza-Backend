import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
	@IsString()
	fullName: string;

	@IsEmail()
	email: string;

	@IsString()
	phone: string;

	@IsString()
	address: string;

	@IsString()
	@IsOptional()
	comment: string;
}
