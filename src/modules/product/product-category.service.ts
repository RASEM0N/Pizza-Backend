import { Injectable } from '@nestjs/common';
import { PrismaService } from '@pizza/prisma';
import { SearchCategoriesDto } from './dto/search.dto';
import { Category } from '@prisma/client';

@Injectable()
export class ProductCategoryService {
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
				name: query ? { contains: query, mode: 'insensitive' } : undefined,
			},
			include: {
				products: {
					orderBy: { id: sortBy },

					where: {
						ingredients: ingredients
							? {
									some: {
										id: {
											in: ingredients,
										},
									},
								}
							: undefined,
						items: {
							some: {
								size: { in: sizes },
								pizzaType: { in: pizzaTypes },
								price: { gte: priceTo, lte: priceFrom },
							},
						},
					},
					include: {
						ingredients: true,
						items: {
							where: { price: { gte: priceTo, lte: priceFrom } },
							orderBy: { price: 'asc' },
						},
					},
				},
			},
		});
	}
}
