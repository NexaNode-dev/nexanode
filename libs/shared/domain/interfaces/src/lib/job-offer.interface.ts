// libs/domain-interfaces/src/lib/job-offer.interface.ts
export interface IJobOffer {
  id: string;
  companyId: string;
  title: string;
  description: string;
  location: string;
  salaryLow: number;
  salaryHigh: number;
  employmentType: 'permanent' | 'contract';
  workTime: 'full-time' | 'part-time';
  contractDuration?: string; // Only for contract jobs
  hoursPerWeek?: number; // Only for part-time jobs
  benefits?: string; // Only for permanent jobs
  jobLevel: 'junior' | 'medior' | 'senior' | 'principal';
  status: 'open' | 'closed';
  requirements: string;
  createdAt: Date;
  updatedAt: Date;
}
