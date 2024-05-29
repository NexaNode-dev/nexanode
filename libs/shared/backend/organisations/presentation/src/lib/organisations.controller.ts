/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { OrganisationsService } from '@nexanode/backend-organisations-application';
import { CreateOrganisationDto } from './dtos/create-organisation.dto';
import { UpdateOrganisationDto } from './dtos/update-organisation.dto';

@Controller('organisations')
export class OrganisationsController {
  constructor(private readonly organisationsService: OrganisationsService) {}

  @Get()
  getOrganisations(@Query() query: any) {
    return this.organisationsService.getOrganisations(query);
  }

  @Get(':id')
  getOrganisationById(@Param('id') id: string) {
    return this.organisationsService.getOrganisationById(id);
  }

  @Post()
  createOrganisation(@Body() createOrganisationDto: CreateOrganisationDto) {
    return this.organisationsService.createOrganisation(createOrganisationDto);
  }

  @Patch(':id')
  updateOrganisation(
    @Param('id') id: string,
    @Body() updateOrganisationDto: UpdateOrganisationDto,
  ) {
    return this.organisationsService.updateOrganisation(
      id,
      updateOrganisationDto,
    );
  }

  @Delete(':id')
  deleteOrganisation(@Param('id') id: string) {
    return this.organisationsService.deleteOrganisation(id);
  }

  @Get('types')
  getOrganisationTypes(@Query() query: any) {
    return this.organisationsService.getOrganisationTypes(query);
  }

  @Get('types/:id')
  getOrganisationTypeById(@Param('id') id: string) {
    return this.organisationsService.getOrganisationType({ where: { id } });
  }

  @Post('types')
  createOrganisationType(@Body() createOrganisationTypeDto: any) {
    return this.organisationsService.createOrganisationType(
      createOrganisationTypeDto,
    );
  }

  @Patch('types/:id')
  updateOrganisationType(
    @Param('id') id: string,
    @Body() updateOrganisationTypeDto: any,
  ) {
    return this.organisationsService.updateOrganisationType(
      id,
      updateOrganisationTypeDto,
    );
  }

  @Delete('types/:id')
  deleteOrganisationType(@Param('id') id: string) {
    return this.organisationsService.deleteOrganisationType(id);
  }
}
