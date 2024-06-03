import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Service } from './service.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ServicesRepository extends Repository<Service> {
  constructor(
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
  ) {
    super(Service, servicesRepository.manager, servicesRepository.queryRunner);
  }

  getServices(options: FindManyOptions<Service> = {}): Promise<Service[]> {
    return this.servicesRepository.find(options);
  }

  async getService(options: FindOneOptions<Service>): Promise<Service> {
    const service = await this.servicesRepository.findOne(options);
    if (!service) {
      throw new NotFoundException(
        `Service with options ${JSON.stringify(options)} not found`,
      );
    }
    return service;
  }

  async createService(service: Partial<Service>): Promise<Service> {
    const newService = this.servicesRepository.create(service);
    return this.servicesRepository.save(newService);
  }

  async updateService(id: string, service: Partial<Service>): Promise<Service> {
    const updatedService = await this.servicesRepository.preload({
      id,
      ...service,
    });
    if (!updatedService) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }
    return this.servicesRepository.save(updatedService);
  }

  async deleteService(id: string): Promise<string> {
    const service = await this.getService({ where: { id } });
    await this.servicesRepository.remove(service);
    return id;
  }
}
