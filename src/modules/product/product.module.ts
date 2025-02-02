import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductCategoryController } from './product-category.controller';
import { ProductCategoryService } from './product-category.service';

@Module({
	providers: [ProductService, ProductCategoryService],
	exports: [ProductService],
	controllers: [ProductController, ProductCategoryController],
})
export class ProductModule {}
