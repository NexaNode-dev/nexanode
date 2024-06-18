/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class PaymentsService {
  abstract initializePayment(data: any): Promise<any>;
  abstract confirmPayment(data: any): Promise<any>;
  abstract getPaymentStatus(data: any): Promise<any>;
}
