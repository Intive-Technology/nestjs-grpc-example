import { NestFactory } from '@nestjs/core';
import { OrderAppModule } from './order-app.module';
// import skywalkingAgent from 'skywalking-backend-js';

async function bootstrap() {
  const app = await NestFactory.create(OrderAppModule);

  await app.listen(3000);
}
bootstrap();
