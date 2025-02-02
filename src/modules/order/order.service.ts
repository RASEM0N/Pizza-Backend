import { Injectable } from '@nestjs/common';
import { PrismaService } from '@pizza/prisma';
import { Order, OrderStatus } from '@prisma/client';
import { CreateOrderDto } from './dto/create.dto';
import { CartService } from '@/modules/cart/cart.service';
import { ResendService } from 'nestjs-resend';
import { PriceDetails } from './dto/get-details.dto';
import { YookassaService, YookassaPaymentData } from '@pizza/yookassa';

@Injectable()
export class OrderService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly cartService: CartService,
		private readonly resendService: ResendService,
		private readonly yookassaService: YookassaService,
	) {}

	async create(
		token: string,
		dto: CreateOrderDto,
	): Promise<{
		order: Order;
		payment: YookassaPaymentData;
	}> {
		const cart = await this.cartService.get(token);

		if (!cart.totalAmount) {
			throw new Error('Cart is empty');
		}

		const order = (await this.prisma.order.create({
			data: {
				token,
				...dto,
				status: OrderStatus.PENDING,
				totalAmount: cart.totalAmount,
				items: JSON.stringify((cart as any).items),
			},
		})) as Order;

		await this.cartService.clear(cart.id);

		const paymentData = await this.yookassaService.createPayment({
			orderId: String(order.id),
			amount: order.totalAmount,
			description: `Оплата заказа #${order.id}`,
		});

		const updatedOrder = (await this.prisma.order.update({
			where: { id: order.id },
			data: { paymentId: paymentData.id },
		})) as Order;

		await this.resendService.send({
			from: '@todo@mail.ru',
			to: dto.email,
			subject: `Next Pizza | Оплатите заказ #${order.id}`,
			html: '<div>Оплатите заказа 🤑</div>',
		});

		return {
			order: updatedOrder,
			payment: paymentData,
		};
	}

	async changeOrderStatus(id: number, status: OrderStatus): Promise<void> {
		const order = (await this.prisma.order.findFirstOrThrow({
			where: { id },
		})) as Order;

		if (order.status === status) {
			return;
		}

		await this.prisma.order.update({
			where: { id },
			data: { status },
		});

		// только при успешном платеже подтверждаем
		if (status === OrderStatus.SUCCEEDED) {
			await this.resendService.send({
				// @TODO Ban
				from: 'onboarding@resend.dev',
				to: order.email,
				subject: `Next Pizza / Ваш заказ успешно оформлен #${order.id}`,
				html: '',
			});
		}
	}

	async priceDetails(token: string): Promise<PriceDetails> {
		const DELIVERY_PRICE = 250;
		const TAXES_PERCENT = 0.15;

		const cart = await this.cartService.get(token);
		const details = {
			deliveryPrice: DELIVERY_PRICE,
			taxesPrice: cart.totalAmount * TAXES_PERCENT,
			cartPrice: cart.totalAmount,
		};

		return {
			...details,
			totalPrice: Object.values(details).reduce((a, b) => a + b),
		};
	}
}
