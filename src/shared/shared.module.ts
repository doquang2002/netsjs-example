import { ConfigModule, ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';

import { GatewayGateway } from 'src/modules/gateway/gateway.gateway';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/modules/auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '60s',
        },
      }),
    }),
  ],
  providers: [ConfigService, GatewayGateway, PassportModule, JwtStrategy],
  exports: [
    ConfigService,
    JwtModule,
    GatewayGateway,
    PassportModule,
    JwtStrategy,
  ],
})
export class SharedModule {}
