import { WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway(80, { namespace: 'events' })
export class CanvaGateway {
  getHello(): string {
    return 'Hello World!';
  }
}
