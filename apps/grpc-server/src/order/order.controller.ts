import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderReq, GetOrderRes } from '@app/proto-schema';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateOrderDto, createOrderSchema } from './dto/create-order.dto';
import { ZodValidationPipe } from 'nestjs-zod';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderAppService: OrderService) {}

  @Post()
  async createOrder(
    @Body(new ZodValidationPipe(createOrderSchema)) body: CreateOrderDto,
  ) {
    const { user } = { user: { id: '1' } }; //Should be read from Req
    const orderId = await this.orderAppService.createOrder(
      body as OrderReq,
      user.id,
    );
    return { orderId };
  }

  @Get()
  async getOrder() {
    const { user } = { user: { id: '1' } }; //Should be read from Req
    const orderRes = await this.orderAppService.getOrders(user.id!);
    return orderRes;
  }

  @GrpcMethod('OrderService', 'createOrder')
  async createOrderGrpc(data: OrderReq) {
    const { user } = { user: { id: '1' } }; //Should be read from MetaData
    const orderId = await this.orderAppService.createOrder(data, user.id);
    return { orderId };
  }

  @GrpcMethod('OrderService', 'getOrders')
  async getOrderGrpc(): Promise<GetOrderRes> {
    const { user } = { user: { id: '1' } }; //Should be read from metadata
    const orderRes = await this.orderAppService.getOrders(user.id);
    console.log('OrderResult', orderRes);
    return orderRes;
  }
}
