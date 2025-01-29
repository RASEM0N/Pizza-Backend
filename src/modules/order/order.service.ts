import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma';
import { OrderStatus } from '@prisma/client';
import { CreateOrderDto } from './dto/create.dto';
import { CartService } from '@/modules/cart/cart.service';
import { YookassaService } from '@/shared/yookassa';
import { ResendService } from 'nestjs-resend';
import { PriceDetails } from './dto/get-details.dto';

@Injectable()
export class OrderService {
	// @TODO хардкод
	private readonly TAXES_PERCENT = 0.15;
	private readonly DELIVERY_PRICE = 250;

	constructor(
		private readonly prisma: PrismaService,
		private readonly cartService: CartService,
		private readonly resendService: ResendService,
		private readonly yookassaService: YookassaService,
	) {}

	// @TODO
	// Promise<YookassaPaymentData>
	async create(token: string, dto: CreateOrderDto): Promise<string> {
		const cart = await this.cartService.get(token);

		if (!cart.totalAmount) {
			throw new Error('Cart is empty');
		}

		const order = await this.prisma.order.create({
			data: {
				token,
				...dto,
				status: OrderStatus.PENDING,
				totalAmount: cart.totalAmount,

				// @todo any
				items: JSON.stringify((cart as any).items),
			},
		});

		await this.cartService.clear(cart.id);

		// @todo
		// @ts-ignore
		// const paymentData = await this.yookassaService.createPayment({
		// 	orderId: String(order.id),
		// 	amount: order.totalAmount,
		// 	description: `Оплата заказа #${order.id}`,
		// });

		// @todo
		// @ts-ignore
		await this.prisma.order.update({
			where: { id: order.id },
			data: { paymentId: 'paymentData.id' },
		});

		// @todo
		// @ts-ignore
		// await this.resendService.send({
		// 	// @TODO Ban
		// 	from: 'onboarding@resend.dev',
		// 	to: dto.email,
		// 	subject: `Next Pizza / Оплатите заказ #${order.id}`,
		// 	html: '',
		// });

		return 'https://www.youtube.com/watch?v=kJQP7kiw5Fk';
	}

	async changeOrderStatus(id: number, status: OrderStatus): Promise<void> {
		const order = await this.prisma.order.findFirstOrThrow({ where: { id } });

		// @todo
		// @ts-ignore
		if (order.status === status) {
			return;
		}

		await this.prisma.order.update({
			where: { id },
			data: { status },
		});

		// только при успешном платеже подтверждаем
		if (status === OrderStatus.SUCCEEDED) {
			// @todo
			// @ts-ignore
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
		const cart = await this.cartService.get(token);
		const details = {
			deliveryPrice: this.DELIVERY_PRICE,
			taxesPrice: cart.totalAmount * this.TAXES_PERCENT,
			cartPrice: cart.totalAmount,
		};

		return {
			...details,
			totalPrice: Object.values(details).reduce((a, b) => a + b),
		};
	}
}
