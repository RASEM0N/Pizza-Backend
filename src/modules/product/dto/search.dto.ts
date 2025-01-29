import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchCategoriesDto {
	@IsString()
	@IsOptional()
	query?: string;

	@IsEnum({ desc: 'desc', asc: 'asc' })
	@IsOptional()
	sortBy?: 'desc' | 'asc';

	@IsArray()
	@IsOptional()
	sizes?: number[];

	@IsArray()
	@IsOptional()
	pizzaTypes?: number[];

	@IsArray()
	@IsOptional()
	ingredients?: number[];

	@IsNumber()
	@IsOptional()
	priceFrom?: number;

	@IsNumber()
	@IsOptional()
	priceTo?: number;
}
