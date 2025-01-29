import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IngredientService } from './ingredient.service';

@ApiTags('Ingredient')
@Controller('ingredient')
export class IngredientController {
	constructor(private readonly ingredientService: IngredientService) {}

	@Get()
	get() {
		return this.ingredientService.getAll();
	}
}
