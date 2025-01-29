import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma';
import { Ingredient } from '@prisma/client';

@Injectable()
export class IngredientService {
	constructor(private readonly prisma: PrismaService) {}

	getAll(): Promise<Ingredient[]> {
		return this.prisma.ingredient.findMany({});
	}
}
