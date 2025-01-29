import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { Cookie } from '@/shared/cookie';
import { YookassaPaymentCallback } from '@/shared/yookassa';
import { OrderStatus } from '@prisma/client';
import { CreateOrderDto } from './dto/create.dto';
import { PriceDetails } from './dto/get-details.dto';

@ApiTags('Order')
@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Post()
	async create(
		@Cookie('cart-token') token: string,
		@Body() dto: CreateOrderDto,
	): Promise<string> {
		return this.orderService.create(token, dto);
	}

	@Post('callback')
	paymentCallback(@Body() data: YookassaPaymentCallback) {
		return this.orderService.changeOrderStatus(
			+data.object.metadata.order_id,
			OrderStatus.SUCCEEDED,
		);
	}

	@Get('details')
	async priceDetails(@Cookie('cart-token') token: string): Promise<PriceDetails> {
		return this.orderService.priceDetails(token);
	}
}
