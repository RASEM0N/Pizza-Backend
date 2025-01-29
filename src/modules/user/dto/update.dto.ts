import { UserEntity } from '../entity/user.entity';
import { PartialType, PickType } from '@nestjs/swagger';

// @TODO по идее Partial Type должно быть
export class UpdateUserDto extends PartialType(
	PickType(UserEntity, ['email', 'fullName', 'password'] as const),
) {}
