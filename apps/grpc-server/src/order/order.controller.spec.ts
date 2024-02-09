import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
describe('OrderAppController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
      imports: [],
    }).compile();

    orderController = app.get<OrderController>(OrderController);
    orderService = app.get<OrderService>(OrderService);
  });

  describe('root', () => {
    it('should defined controller', () => {
      expect(orderController).toBeDefined();
    });

    it('it should create order with REST', async () => {
      const body: CreateOrderDto = {
        products: [
          {
            productId: '10001',
            price: 100,
            qty: 10,
          },
        ],
      };
      const result = await orderController.createOrder(body);
      expect(result).toHaveProperty('orderId');
    });

    it('it should get order', async () => {
      const orderServiceSpy = jest
        .spyOn(orderService, 'getOrders')
        .mockResolvedValueOnce({
          orders: [
            {
              orderId: '1000',
              customerId: '1',
              products: [
                {
                  productId: '10001',
                  qty: 10,
                  price: 5,
                },
              ],
            },
          ],
        });

      const result = await orderController.getOrder();
      expect(result).toHaveProperty('orders');
      expect(result.orders).toHaveLength(1);
      expect(orderServiceSpy).toHaveBeenCalled();
    });
  });
});
