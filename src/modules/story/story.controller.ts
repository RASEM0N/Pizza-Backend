import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StoryService } from './story.service';

@ApiTags('Story')
@Controller('story')
export class StoryController {
	constructor(private readonly storyService: StoryService) {}

	@Get()
	get() {
		return this.storyService.getAll();
	}
}
