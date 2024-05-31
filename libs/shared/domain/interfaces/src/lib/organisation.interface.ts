export interface IOrganisation {
  id: string;
  name: string;
  description: string;
  typeId: string;
  registrationNumber?: string;
  email?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}
