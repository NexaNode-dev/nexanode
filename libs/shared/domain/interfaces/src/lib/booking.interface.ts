export interface IBooking {
  id: string;
  reference: string;
  eventId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
}
