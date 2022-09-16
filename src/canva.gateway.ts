import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class CanvaGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('pixel')
  handlePixel(
    @MessageBody() pixel: string,
    @ConnectedSocket() client: Socket,
  ): void {
    this.server.emit('pixel', pixel);
    console.log(client);
  }
}
