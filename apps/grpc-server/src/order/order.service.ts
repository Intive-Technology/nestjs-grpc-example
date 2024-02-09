import { type GetOrderRes, type OrderReq, type Order } from '@app/proto-schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  private orders: Order[] = [];

  async createOrder(data: OrderReq, customerId: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orderId = `${1000 + this.orders.length}`;
        this.orders.push({ ...data, orderId, customerId });
        resolve(orderId);
      }, 1000);
    });
  }

  async getOrders(customerId: string): Promise<GetOrderRes> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = this.orders.filter(
          (order) => order.customerId === customerId,
        );
        resolve({ orders: result });
      }, 1000);
    });
  }
}
