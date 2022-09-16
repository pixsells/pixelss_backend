import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway(80, { namespace: 'canva' })
export class CanvaGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('pixel')
  handlePixel(@MessageBody() message: string): void {
    this.server.emit('pixel', message);
  }
}
