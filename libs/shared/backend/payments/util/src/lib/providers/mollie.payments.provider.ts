import { Inject, Injectable } from '@nestjs/common';
import { MollieClient, Payment, PaymentStatus } from '@mollie/api-client';
import { PaymentsService } from '../payments.service';

@Injectable()
export class MolliePaymentsProvider implements PaymentsService {
  constructor(
    @Inject('MOLLIE_CLIENT')
    private readonly mollieClient: MollieClient,
  ) {}
  async initializePayment(data: any): Promise<Payment> {
    const payment = await this.mollieClient.payments.create({
      amount: {
        value: data.amount,
        currency: data.currency,
      },
      description: data.description,
      redirectUrl: data.redirectUrl,
    });

    return payment;
  }

  async confirmPayment(paymentId: string): Promise<Payment> {
    const payment = await this.mollieClient.payments.get(paymentId);
    switch (payment.status) {
      case PaymentStatus.paid:
        return payment;
      case PaymentStatus.failed:
        throw new Error('Payment failed');
      default:
        throw new Error('Payment not paid');
    }
  }

  async getPaymentStatus(paymentId: string): Promise<PaymentStatus> {
    const payment = await this.mollieClient.payments.get(paymentId);
    return payment.status;
  }
}
