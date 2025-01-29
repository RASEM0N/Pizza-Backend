import { IsArray, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
	@ApiProperty()
	@IsNumber()
	@IsPositive()
	productItemId: number;

	@ApiProperty()
	@IsOptional()
	@IsArray()
	ingredients?: number[];
}
