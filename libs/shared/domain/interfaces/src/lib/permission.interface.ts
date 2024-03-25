export interface IPermission {
  id: string;
  name: string;
  description?: string;
  action: string;
  subject: string;
  conditions?: object;
  createdAt: Date;
  updatedAt: Date;
}
