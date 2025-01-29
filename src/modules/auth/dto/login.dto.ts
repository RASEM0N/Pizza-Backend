import { PickType } from '@nestjs/swagger';
import { UserEntity } from '@/modules/user/entity/user.entity';
import { CreateUserDto } from '@/modules/user/dto/create.dto';

export class LoginDto extends PickType(UserEntity, ['email', 'password']) {}

export class RegisterDto extends CreateUserDto {}
