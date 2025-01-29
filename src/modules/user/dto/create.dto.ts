import { UserEntity } from '../entity/user.entity';
import { PickType } from '@nestjs/swagger';

export class CreateUserDto extends PickType(UserEntity, [
	'email',
	'fullName',
	'password',
] as const) {}
