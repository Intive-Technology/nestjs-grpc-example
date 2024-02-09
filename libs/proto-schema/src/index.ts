import { join } from 'path';

export * from './order';
export type * from './order';

export const OrderProtoOptions = {
  package: 'orderapp',
  protoPath: join(
    process.cwd(),
    'dist',
    'libs',
    'proto-schema',
    'proto',
    'order.proto',
  ),
  url: '0.0.0.0:5000',
};

console.log(OrderProtoOptions);
