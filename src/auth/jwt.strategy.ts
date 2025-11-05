import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvironmentService } from '../environment/environment.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(environmentService: EnvironmentService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Lấy JWT từ header Authorization: Bearer <token>
      ignoreExpiration: false,
      secretOrKey: environmentService.jwtSecret,
    });
  }

  validate(payload: any) {
    // payload là dữ liệu được mã hoá trong token khi login
    return { userId: payload.sub, username: payload.username };
  }
}
