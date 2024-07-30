export interface IBooking {
  id: string;
  reference: string;
  eventId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  userId?: string;
  name: string;
  email: string;
  phone?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  units: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
