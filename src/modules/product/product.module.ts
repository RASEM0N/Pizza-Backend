import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CategoryService } from './category.service';

@Module({
	providers: [ProductService, CategoryService],
	exports: [ProductService],
	controllers: [ProductController]
})
export class ProductModule {}
