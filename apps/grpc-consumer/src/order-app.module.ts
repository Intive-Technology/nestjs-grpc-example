import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { OrderAppController } from './order-app.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDER_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'orderapp',
          protoPath: join(
            process.cwd(),
            'dist',
            'libs',
            'proto-schema',
            'proto',
            'order.proto',
          ),
          url: 'app:5000',
        },
      },
    ]),
  ],
  controllers: [OrderAppController],
  providers: [],
})
export class OrderAppModule {}
