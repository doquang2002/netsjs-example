import { GatewayGateway } from './gateway.gateway';
import { GatewayService } from './gateway.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [GatewayGateway, GatewayService],
  exports: [GatewayGateway],
})
export class GatewayModule {}
