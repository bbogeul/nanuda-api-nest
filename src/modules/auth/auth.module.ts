import { Module } from '@nestjs/common';
import { Admin } from '../admin';
import { AdminAuthController } from './admin-auth.controller';
import { PasswordService } from './password.service';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtConfigService } from 'src/config';
import { JwtStrategy } from './jwt/jwt.strategy';
import { NanudaUser } from '../nanuda-user';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, NanudaUser]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({ useClass: JwtConfigService }),
  ],
  controllers: [AdminAuthController],
  providers: [PasswordService, AuthService, JwtStrategy],
  exports: [],
})
export class AuthModule {}
