import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ServicesService } from '@nexanode/backend-services-application';
import { IService } from '@nexanode/domain-interfaces';
import { CreateServiceDto } from './dtos/create-service.dto';
import { UpdateServiceDto } from './dtos/update-service.dto';
import { Rbac } from '@nexanode/backend-rbac-util';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Rbac({ action: 'read', subject: 'Service' })
  @Get()
  findAll(@Query() query?: never): Promise<IService[]> {
    return this.servicesService.getServices(query);
  }

  @Rbac({ action: 'read', subject: 'Service' })
  @Get(':id')
  findOneById(@Param('id') id: string): Promise<IService> {
    return this.servicesService.getService(id);
  }

  @Rbac({ action: 'create', subject: 'Service' })
  @Post()
  create(@Body() createServiceDto: CreateServiceDto): Promise<IService> {
    return this.servicesService.createService(createServiceDto);
  }

  @Rbac({ action: 'update', subject: 'Service' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ): Promise<IService> {
    return this.servicesService.updateService(id, updateServiceDto);
  }

  @Rbac({ action: 'delete', subject: 'Service' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<string> {
    return this.servicesService.deleteService(id);
  }
}
