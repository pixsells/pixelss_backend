import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

const canvasArray = [];
canvasArray.length = 400 * 3;
canvasArray.fill([]);

for (let i = 0; i < canvasArray.length; i++) {
  canvasArray[i].length = 250 * 3;
  canvasArray[i].fill('#FFF');
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class CanvaGateway {
  private logger: Logger = new Logger('AppGateWay');

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket) {
    this.server.to(client.id).emit('canva', JSON.stringify(canvasArray));
    this.logger.log(`lient connecter ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`lient disconnected ${client.id}`);
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('pixelPainted')
  handlePixel(
    @MessageBody() pixel: string,
    @ConnectedSocket() client: Socket,
  ): void {
    this.manageCanvas(pixel);
    this.server.emit('pixel', pixel);
  }

  manageCanvas(canva: string): void {
    const pixel = JSON.parse(canva);
    const canvasY = JSON.parse(JSON.stringify(canvasArray[pixel.x]));
    canvasY[pixel.y] = pixel.color;
    canvasArray[pixel.x] = canvasY;
  }
}
