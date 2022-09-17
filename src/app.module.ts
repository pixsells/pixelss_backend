import { Module } from '@nestjs/common';
import { CanvaGateway } from './canva.gateway';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [CanvaGateway, AppService],
})
export class AppModule {}
