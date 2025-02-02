import { Injectable } from '@nestjs/common';
import { PrismaService } from '@pizza/prisma';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
	constructor(private readonly prisma: PrismaService) {}

	get(id: number): Promise<Product> {
		return this.prisma.product.findFirstOrThrow({
			where: { id },
			include: {
				items: true,
				ingredients: true,
				Category: {
					include: {
						products: {
							include: {
								items: true,
							},
						},
					},
				},
			},
		});
	}

	getAllByQuery(query: string): Promise<Product[]> {
		return this.prisma.product.findMany({
			take: 5,
			where: {
				name: {
					contains: query,
					mode: 'insensitive',
				},
			},
		});
	}
}
