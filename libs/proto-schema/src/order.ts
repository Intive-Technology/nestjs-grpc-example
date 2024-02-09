import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';

export type Product = {
  productId: string;
  qty: number;
  price: number;
};

export type OrderReq = {
  products: Array<Product>;
};

export type OrderRes = {
  orderId: string;
};

export type Order = {
  orderId: string;
  customerId: string;
  products: Array<Product>;
};

export type getOrderReq = unknown;

export type GetOrderRes = {
  orders: Array<Order>;
};

export interface OrderService {
  createOrder(data: OrderReq, metadata?: Metadata): Observable<OrderRes>;
  getOrders(data: getOrderReq, metadata?: Metadata): Observable<GetOrderRes>;
}
