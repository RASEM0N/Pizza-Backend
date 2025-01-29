import { Module } from '@nestjs/common';
import { StoryService } from './story.service';
import { StoryController } from './story.controller';

@Module({
	providers: [StoryService],
	exports: [StoryService],
	controllers: [StoryController]
})
export class StoryModule {}
