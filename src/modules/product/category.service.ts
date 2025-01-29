import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma';
import { SearchCategoriesDto } from './dto/search.dto';
import { Category } from '@prisma/client';

// @todo не на своем месте находится
@Injectable()
export class CategoryService {
	constructor(private readonly prisma: PrismaService) {}

	async search({
		priceTo = 0,
		priceFrom = 1000,
		sortBy = 'desc',
		ingredients,
		pizzaTypes,
		sizes,
		query,
	}: SearchCategoriesDto): Promise<Category[]> {
		return this.prisma.category.findMany({
			where: {
				name: { contains: query, mode: 'insensitive' },
			},
			include: {
				products: {
					orderBy: { id: sortBy },

					// @TODO
					// price: { gte: priceTo, lte: priceFrom },
					where: {
						// ingredients: ingredients
						// 	? {
						// 			some: {
						// 				id: {
						// 					in: ingredients,
						// 				},
						// 			},
						// 		}
						// 	: undefined,
						// items: {
						// 	some: {
						// 		size: { in: sizes },
						// 		pizzaType: { in: pizzaTypes },
						//
						//
						// 	},
						// },
					},
					include: {
						ingredients: true,
						items: {

							// @TODO
							// where: { price: { gte: priceTo, lte: priceFrom } },
							orderBy: { price: 'asc' },
						},
					},
				},
			},
		});
	}
}
