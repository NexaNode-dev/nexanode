export interface IPermission {
  id: string;
  name: string;
  description?: string;
  action: string;
  subject: string;
  conditions?: string;
  createdAt: Date;
  updatedAt: Date;
}
