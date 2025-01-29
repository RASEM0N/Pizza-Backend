import { IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCartDto {
	@ApiProperty()
	@IsNumber()
	@IsPositive()
	quantity: number;
}
