import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ContactsService } from '@nexanode/backend-contacts-application';
import { IContact } from '@nexanode/domain-interfaces';
import { CreateContactDto } from './dtos/create-contact.dto';
import { UpdateContactDto } from './dtos/update-contact.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  findAll(): Promise<IContact[]> {
    return this.contactsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IContact> {
    return this.contactsService.findOne(id);
  }

  @Post()
  create(@Body() createContactDto: CreateContactDto): Promise<IContact> {
    return this.contactsService.create(createContactDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ): Promise<IContact> {
    return this.contactsService.update(id, updateContactDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<string | null> {
    return this.contactsService.delete(id);
  }
}