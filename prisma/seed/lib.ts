import { Prisma } from '@prisma/client';

export const randomDecimalNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

export const generateProductItem = ({
	productId,
	pizzaType,
	size,
}: {
	productId: number;
	pizzaType?: 1 | 2 ;
	size?: 20 | 30 | 40;
}) => {
	let price;

	if (!size) {
		price = randomDecimalNumber(100, 400)
	}

	if (size === 20) {
		price = randomDecimalNumber(150, 250)
	}

	if (size === 30) {
		price = randomDecimalNumber(251, 400)
	}

	if (size === 40) {
		price = randomDecimalNumber(401, 550)
	}

	return {
		pizzaType,
		productId,
		size,
		price,
	} as Prisma.ProductItemUncheckedCreateInput;
};
