import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { of } from 'rxjs';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const orderService = { getOrders: jest.fn() };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider('ORDER_SERVICE')
      .useValue({
        getService: () => orderService,
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/orders (POST) Failed with 400 error', () => {
    return request(app.getHttpServer()).post(`/orders`).expect(400);
  });

  it('/orders (POST) Success', () => {
    return request(app.getHttpServer())
      .post(`/orders`)
      .send({
        products: [
          {
            productId: '10001',
            price: 100,
            qty: 10,
          },
        ],
      })
      .expect(201);
  });

  it('/orders (GET) Success', () => {
    orderService.getOrders.mockImplementationOnce(() => of([]));
    return request(app.getHttpServer()).get(`/orders`).expect(200);
  });
});
