import { PrismaClient } from '@prisma/client';
import * as data from './data';
import { productsWithIngredients, productWithIngredientsItems } from './data';
import { generateProductItem } from './lib';

const prisma = new PrismaClient();

const addData = async () => {
	await prisma.user.createMany({ data: data.users });
	await prisma.category.createMany({ data: data.categories });
	await prisma.ingredient.createMany({ data: data.ingredients });
	const products = await prisma.product.createManyAndReturn({ data: data.products });

	for (const product of products) {
		await prisma.productItem.create({
			data: generateProductItem({ productId: product.id }),
		});
	}

	for (const data of productsWithIngredients) {
		const product = await prisma.product.create({ data });
		await prisma.productItem.createMany({
			data: [...productWithIngredientsItems([product])],
		});
	}

	await prisma.cart.createMany({ data: data.carts });
	await prisma.cartItem.create({ data: data.cartItems[0] });
	await prisma.story.createMany({ data: data.stories });
	await prisma.storyItem.createMany({ data: data.storyItems });
};

const reset = async () => {
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
};

(async () => {
	try {
		await reset();
		await addData();
		await prisma.$disconnect();
	} catch (e) {
		await prisma.$disconnect();
		console.error(e);
		process.exit(1);
	}
})();
