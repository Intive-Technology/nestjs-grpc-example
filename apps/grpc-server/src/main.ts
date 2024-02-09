import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OrderProtoOptions } from '@app/proto-schema';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: OrderProtoOptions,
  });

  await app.startAllMicroservices();

  await app.listen(3000);

  console.log('Main app');
}
bootstrap();
