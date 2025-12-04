import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { EnvironmentService } from '../environment/environment.service';
import { EnvironmentModule } from '../environment/environment.module';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../core/users/users.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [EnvironmentModule],
      inject: [EnvironmentService],
      useFactory: (config: EnvironmentService) => ({
        global: true,
        secret: config.jwtSecret,
        signOptions: { expiresIn: '7 days' },
      }),
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
