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
import { ICategory, IService } from '@nexanode/domain-interfaces';
import { CreateServiceDto } from './dtos/create-service.dto';
import { UpdateServiceDto } from './dtos/update-service.dto';
import { Rbac } from '@nexanode/backend-rbac-util';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';

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
  delete(@Param('id') id: string): Promise<string> {
    return this.servicesService.deleteService(id);
  }

  @Rbac({ action: 'read', subject: 'Service' })
  @Get('category/:categoryId')
  findByCategory(@Param('categoryId') categoryId: string): Promise<IService[]> {
    return this.servicesService.getServicesByCategory(categoryId);
  }

  @Rbac({ action: 'read', subject: 'ServiceCategory' })
  @Get('categories')
  getCategories(@Query() query?: never): Promise<ICategory[]> {
    return this.servicesService.getCategories(query);
  }

  @Rbac({ action: 'read', subject: 'ServiceCategory' })
  @Get('categories/:id')
  getCategory(@Param('id') id: string): Promise<ICategory> {
    return this.servicesService.getCategoryById(id);
  }

  @Rbac({ action: 'create', subject: 'ServiceCategory' })
  @Post('categories')
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<ICategory> {
    return this.servicesService.createCategory(createCategoryDto);
  }

  @Rbac({ action: 'update', subject: 'ServiceCategory' })
  @Patch('categories/:id')
  updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<ICategory> {
    return this.servicesService.updateCategory(id, updateCategoryDto);
  }

  @Rbac({ action: 'delete', subject: 'ServiceCategory' })
  @Delete('categories/:id')
  deleteCategory(@Param('id') id: string): Promise<string> {
    return this.servicesService.deleteCategory(id);
  }
}
