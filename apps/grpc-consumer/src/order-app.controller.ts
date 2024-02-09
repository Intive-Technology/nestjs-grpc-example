import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { first } from 'rxjs';
import { ClientGrpcProxy } from '@nestjs/microservices';
import {
  GetOrderRes,
  Order,
  OrderReq,
  OrderRes,
  OrderService,
} from '@app/proto-schema';

@Controller('order')
export class OrderAppController implements OnModuleInit {
  private orderClient: OrderService;
  constructor(
    @Inject('ORDER_SERVICE') private readonly grpcService: ClientGrpcProxy,
  ) {}

  onModuleInit() {
    this.orderClient =
      this.grpcService.getService<OrderService>('OrderService');
  }

  @Get()
  async getOrders(): Promise<Array<Order>> {
    const rpcReq: Promise<Order[]> = new Promise((resolve, reject) => {
      try {
        this.orderClient
          .getOrders({})
          .pipe(first())
          .subscribe((result: GetOrderRes) => {
            resolve(result.orders);
          });
      } catch (error) {
        reject(error);
      }
    });
    const orders = await rpcReq;
    return orders;
  }

  @Post()
  async createOrders(@Body() data: OrderReq): Promise<OrderRes> {
    const rpcReq: Promise<OrderRes> = new Promise((resolve, reject) => {
      try {
        this.orderClient
          .createOrder(data)
          .pipe(first())
          .subscribe((result: OrderRes) => {
            resolve(result);
          });
      } catch (error) {
        reject(error);
      }
    });
    const orders = await rpcReq;
    return orders;
  }
}
