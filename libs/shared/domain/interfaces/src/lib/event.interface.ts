export interface IEvent {
  id: string;
  name: string;
  description?: string;
  from: Date;
  to?: Date;
  location: string;
  units: number;
  unitType: string;
  unitCapacity: number;
  serviceId?: string;
  recurring: boolean;
  interval?: number;
  intervalUnit?: 'day' | 'week' | 'month' | 'year';
  createdAt: Date;
  updatedAt: Date;
}
