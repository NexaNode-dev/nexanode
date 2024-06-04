/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { ServicesRepository } from '@nexanode/backend-services-data-access';
import { IService } from '@nexanode/domain-interfaces';

@Injectable()
export class ServicesService {
  constructor(private readonly servicesRepository: ServicesRepository) {}

  async getServices(options?: any): Promise<IService[]> {
    return this.servicesRepository.getServices(options);
  }

  async getService(options?: any): Promise<IService> {
    return this.servicesRepository.getService(options);
  }

  async getServiceById(id: string): Promise<IService> {
    return this.servicesRepository.getService({ where: { id } });
  }

  async createService(service: Partial<IService>): Promise<IService> {
    return this.servicesRepository.createService(service);
  }

  async updateService(
    id: string,
    service: Partial<IService>,
  ): Promise<IService> {
    return this.servicesRepository.updateService(id, service);
  }

  async deleteService(id: string): Promise<string> {
    return this.servicesRepository.deleteService(id);
  }
}
