import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthJwtStrategy } from './guard/auth-jwt.strategy';
import { UserModule } from '@/modules/user/user.module';
import { PassportModule } from '@nestjs/passport';

@Module({
	controllers: [AuthController],
	imports: [UserModule, PassportModule],
	providers: [AuthService, AuthJwtStrategy],
})
export class AuthModule {}
