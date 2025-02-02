import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Response,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Cart } from '@prisma/client';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create.dto';
import { UpdateCartDto } from './dto/update.dto';
import { Cookie } from '@pizza/common/cookie';
import { Response as ExpResponse } from 'express';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
	constructor(private readonly cartService: CartService) {}

	@Get()
	get(
		@Cookie({ name: 'cart-token', canEmpty: true }) token: string,
	): Promise<Cart | undefined> {
		if (!token) {
			return;
		}

		return this.cartService.get(token, false);
	}

	@Post()
	async create(
		@Cookie({ name: 'cart-token', canEmpty: true }) cartToken: string,
		@Response() response: ExpResponse,
		@Body() dto: CreateCartDto,
	): Promise<void> {
		const { cart, token } = await this.cartService.create(dto, cartToken);
		response.cookie('cart-token', token).json(cart);
	}

	@Delete(':cartItemId')
	delete(
		@Cookie('cart-token') token: string,
		@Param('cartItemId') cartItemId: number,
	): Promise<Cart> {
		return this.cartService.deleteItem(token, cartItemId);
	}

	@Put(':cartItemId')
	update(
		@Cookie('cart-token') token: string,
		@Param('cartItemId') cartItemId: number,
		@Body() dto: UpdateCartDto,
	): Promise<Cart> {
		return this.cartService.update(token, cartItemId, dto);
	}
}
