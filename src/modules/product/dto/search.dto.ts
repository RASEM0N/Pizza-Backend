import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

const QueryToArrayNumbers = () => {
	return Transform(({ value }) =>
		value
			.split(',')
			.map((v) => +v)
			.filter((v) => v > 0),
	);
};

export class SearchCategoriesDto {
	@IsString()
	@IsOptional()
	query?: string;

	@IsEnum({ desc: 'desc', asc: 'asc' })
	@IsOptional()
	sortBy?: 'desc' | 'asc';

	@IsArray()
	@IsOptional()
	@QueryToArrayNumbers()
	sizes?: number[];

	@IsArray()
	@IsOptional()
	@QueryToArrayNumbers()
	pizzaTypes?: number[];

	@IsArray()
	@IsOptional()
	@QueryToArrayNumbers()
	ingredients?: number[];

	@IsNumber()
	@IsOptional()
	priceFrom?: number;

	@IsNumber()
	@IsOptional()
	priceTo?: number;
}
