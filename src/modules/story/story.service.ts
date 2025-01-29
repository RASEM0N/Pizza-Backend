import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma';
import { Story } from '@prisma/client';

@Injectable()
export class StoryService {
	constructor(private readonly prisma: PrismaService) {}

	getAll(): Promise<Story[]> {
		return this.prisma.story.findMany({
			include: {
				items: true,
			},
		});
	}
}
