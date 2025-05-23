import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum PaymentMethod {
  CASH = 'Cash',
  CREDIT_CARD = 'Credit Card',
  KAKAO_PAY = 'Kakao Pay',
  PAYPAL = 'PayPal',
}

@Schema({
  _id: false,
})
export class Payment {
  @Prop()
  paymentId: string;

  @Prop({
    enum: PaymentMethod,
    default: PaymentMethod.CREDIT_CARD,
  })
  paymentMethod: PaymentMethod;

  @Prop({
    required: true,
  })
  paymentName: string;

  @Prop({
    required: true,
  })
  amount: number;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
