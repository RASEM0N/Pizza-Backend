import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update.dto';
import { CreateUserDto } from './dto/create.dto';
import { User } from '@prisma/client';
import { hash, genSalt, compare } from 'bcrypt';
import { PrismaService } from '@/shared/prisma';
import { ResendService } from 'nestjs-resend';

// @TODO
// - password не надо возвращать

@Injectable()
export class UserService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly resendService: ResendService,
	) {}

	get(id: number): Promise<User> {
		return this.prisma.user.findFirst({ where: { id }, omit: { password: false } });
	}

	getAll(): Promise<User[]> {
		return this.prisma.user.findMany({ omit: { password: false } });
	}

	async create(dto: CreateUserDto): Promise<User> {
		// @todo
		// @ts-ignore
		const hashedPassword = await this._encryptPassword(dto.password);

		// @todo
		// @ts-ignore
		return this.prisma.user.create({
			data: { email: dto.email, fullName: dto.fullName, password: hashedPassword },
			omit: { password: false },
		});
	}

	async update(id: number, dto: UpdateUserDto): Promise<User> {
		const user = await this.prisma.user.findFirstOrThrow({ where: { id } });
		const data = { fullName: dto.fullName, email: dto.email };

		// @TODO также засолить пароль надо
		if (dto.password) {
			// data.password = await this._encryptPassword(dto.password);
		}

		const updatedUser = await this.prisma.user.update({ where: { id }, data });

		if (user.email !== updatedUser.email) {
			// @TODO если почта изменилась то должна отправлятся письмо на почту

			// @TODO Ban
			await this.resendService.send({
				from: 'onboarding@resend.dev',
				to: updatedUser.email,
				subject: '',
				html: '',
			});
		}

		return updatedUser;
	}

	async validateUser(email: string, password: string): Promise<User> {
		const user = await this.prisma.user.findFirst({ where: { email } });

		// @todo
		// @ts-ignore
		if (user && (await compare(password, user.password))) {
			return { ...user, password: undefined };
		}

		throw new Error('Error validation');
	}

	private async _encryptPassword(password: string): Promise<string> {
		return hash(password, await genSalt(10));
	}
}
