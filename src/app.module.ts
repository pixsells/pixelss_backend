import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CanvaGateway } from './canva.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CanvaGateway],
})
export class AppModule {}
