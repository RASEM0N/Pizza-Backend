import { Injectable } from '@nestjs/common';
import { PrismaService } from '@pizza/prisma';
import { Cart, CartItem } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { CreateCartDto } from './dto/create.dto';
import { UpdateCartDto } from '@/modules/cart/dto/update.dto';

// @TODO
// - надо навестить порядок в логике
// - надо навестить порядок в запросах
// - ts-ignore убрать

@Injectable()
export class CartService {
	constructor(private readonly prisma: PrismaService) {}

	async get(token: string, fall = true): Promise<Cart> {
		return (fall ? this.prisma.cart.findFirstOrThrow : this.prisma.cart.findFirst)({
			where: { token },
			include: {
				items: {
					orderBy: { createdAt: 'desc' },
					include: {
						ingredients: true,
						productItem: {
							include: { Product: true },
						},
					},
				},
			},
		});
	}

	async create(
		dto: CreateCartDto,
		token: string = uuidv4(),
	): Promise<{ cart: Cart; token: string }> {
		const cart = await this.createOrGet(token);

		await this.createOrUpdateItem(cart.id, dto);
		const actualizedCart = await this._actualizeTotalAmount(cart.id);

		return { cart: actualizedCart, token };
	}

	async update(token: string, cartItemId: number, dto: UpdateCartDto): Promise<Cart> {
		await this.prisma.cartItem.update({
			where: { id: cartItemId },
			data: { quantity: dto.quantity },
		});

		return this._actualizeTotalAmount((await this.get(token)).id);
	}

	async deleteItem(token: string, cartItemId: number): Promise<Cart> {
		await this.prisma.cartItem.findFirstOrThrow({ where: { id: cartItemId } });
		await this.prisma.cartItem.delete({ where: { id: cartItemId } });

		return await this._actualizeTotalAmount((await this.get(token)).id);
	}

	async createOrUpdateItem(cartId: number, dto: CreateCartDto): Promise<CartItem> {
		const cartItem = await this.prisma.cartItem.findFirst({
			where: {
				cartId,
				productItemId: dto.productItemId,
				ingredients: {
					every: {
						id: { in: dto.ingredients },
					},
				},
			},
		});

		if (cartItem) {
			// @ts-ignore
			return this.prisma.cartItem.update({
				where: { id: cartItem.id },
				data: { quantity: cartItem.quantity + 1 },
			});
		}

		return this.prisma.cartItem.create({
			data: {
				cartId,
				productItemId: dto.productItemId,
				quantity: 1,
				ingredients: {
					connect: (dto.ingredients ?? []).map((id) => ({ id })),
				},
			},
		});
	}

	async createOrGet(token: string): Promise<Cart> {
		const cart = await this.prisma.cart.findFirst({
			where: { token },
			include: { items: true },
		});

		if (cart) {
			return cart;
		}

		return this.prisma.cart.create({
			data: { token },
			include: { items: true },
		});
	}

	async clear(id: number): Promise<void> {
		await this.prisma.cart.update({ where: { id }, data: { totalAmount: 0 } });
		await this.prisma.cartItem.deleteMany({ where: { cartId: id } });
	}

	private async _actualizeTotalAmount(id: number): Promise<Cart> {
		const cart = await this.prisma.cart.findFirstOrThrow({
			where: { id },
			include: {
				items: {
					include: { ingredients: true, productItem: true },
				},
			},
		});

		return this.prisma.cart.update({
			where: { id },
			data: { totalAmount: this._calculateTotalAmount(cart as Cart) },
			include: {
				items: {
					orderBy: { createdAt: 'desc' },
					include: {
						ingredients: true,
						productItem: {
							include: { Product: true },
						},
					},
				},
			},
		});
	}

	private _calculateTotalAmount(cart: Cart): number {
		// @ts-ignore
		return cart.items.reduce(
			(res, item) => res + this._calculateItemTotalPrice(item),
			0,
		);
	}

	private _calculateItemTotalPrice(item: CartItem): number {
		// @ts-ignore
		const ingredientPrice = item.ingredients.reduce(
			(acc, ingredient) => acc + ingredient.price,
			0,
		);

		// @ts-ignore
		return (ingredientPrice + item.productItem.price) * item.quantity;
	}
}
