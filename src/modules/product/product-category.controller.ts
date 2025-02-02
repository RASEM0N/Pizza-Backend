import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import { SearchCategoriesDto } from './dto/search.dto';
import { ProductCategoryService } from './product-category.service';

@ApiTags('Product')
@Controller('category')
export class ProductCategoryController {
	constructor(private readonly categoryService: ProductCategoryService) {}

	@Get()
	search(@Query() dto: SearchCategoriesDto): Promise<Category[]> {
		return this.categoryService.search(dto);
	}
}
