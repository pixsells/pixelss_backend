import { Module } from '@nestjs/common';
import { CanvaGateway } from './canva.gateway';

@Module({
  imports: [],
  providers: [CanvaGateway],
})
export class AppModule {}
