import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { config } from "process";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,){
    constructor(config: ConfigService) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
     
          secretOrKey: config.get('JWT_SECRET'),
        });
      }
    
      async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
      }
}