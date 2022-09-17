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
canvasArray.length = 400;
canvasArray.fill([]);

for (let i = 0; i < canvasArray.length; i++) {
  canvasArray[i].length = 250;
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
    // this.manageCanvas(pixel);
    this.server.emit('canva', JSON.stringify(canvasArray));
    this.server.emit('pixel', JSON.stringify(pixel));
  }

  manageCanvas(canva: string) {
    const pixel = JSON.parse(canva);

    const canvasY = canvasArray[pixel.x];

    canvasY[pixel.y] = pixel.color;

    canvasArray[pixel.x] = canvasY;
  }
}
