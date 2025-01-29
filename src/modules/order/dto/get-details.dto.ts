import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PriceDetails {
	@ApiProperty()
	@IsNumber()
	taxesPrice: number;

	@IsNumber()
	@ApiProperty()
	deliveryPrice: number;

	@IsNumber()
	@ApiProperty()
	cartPrice: number;

	@IsNumber()
	@ApiProperty()
	totalPrice: number;
}