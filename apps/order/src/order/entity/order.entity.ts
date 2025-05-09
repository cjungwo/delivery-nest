import { Prop, Schema } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './customer.entity';
import {
  DeliveryAddress,
  DeliveryAddressSchema,
} from './delivery-address.entity';
import { Payment, PaymentSchema } from './payment.entity';
import { Product, ProductSchema } from './product.entity';

export enum OrderStatus {
  PENDING = 'Pending',
  PAYMENT_CANCELLED = 'Payment Cancelled',
  PAYMENT_FAILED = 'Payment Failed',
  PAYMENT_PROCESSED = 'Payment Processed',
  DELIVERY_STARTED = 'Delivery Started',
  DELIVERY_DONE = 'Delivery Done',
}

@Schema()
export class Order extends Document {
  @Prop({
    type: CustomerSchema,
    required: true,
  })
  customer: Customer;

  @Prop({
    type: ProductSchema,
    required: true,
  })
  product: Product[];

  @Prop({
    type: DeliveryAddressSchema,
    required: true,
  })
  deliveryAddress: DeliveryAddress;

  @Prop({
    enum: OrderStatus,
    default: OrderStatus.PENDING,
    required: true,
  })
  status: OrderStatus;

  @Prop({
    type: PaymentSchema,
    required: true,
  })
  payment: Payment;
}
