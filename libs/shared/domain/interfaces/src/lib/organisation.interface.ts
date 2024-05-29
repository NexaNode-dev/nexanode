export interface IOrganisation {
  id: string;
  name: string;
  description: string;
  typeId: string;
  registrationNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}
