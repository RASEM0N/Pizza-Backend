import { Body, Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Category, Product } from '@prisma/client';
import { ProductService } from './product.service';
import { CategoryService } from './category.service';
import { SearchCategoriesDto } from './dto/search.dto';

@ApiTags('Product')
@Controller()
export class ProductController {
	constructor(
		private readonly productService: ProductService,
		private readonly categoryService: CategoryService,
	) {}

	@Get('/product/:productId')
	getById(@Param('productId', ParseIntPipe) productId: number): Promise<Product> {
		return this.productService.get(productId);
	}

	@Get('/product')
	get(@Query('query') query: string): Promise<Product[]> {
		return this.productService.getAllByQuery(query);
	}

	// @todo пока что сюда приземлил
	@Get('/category')
	search(@Query() dto: SearchCategoriesDto): Promise<Category[]> {
		return this.categoryService.search(dto);
	}
}
