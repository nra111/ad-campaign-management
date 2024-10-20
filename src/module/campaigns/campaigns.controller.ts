import { Controller, Get, Post, Body, Patch, Param, Delete, Version, Put, UseFilters } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';
import { CustomValidationExceptionFilter } from 'src/shared/custom-exception';

@ApiTags('Campaigns')
@UseFilters(CustomValidationExceptionFilter)
@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}
  
  @Put()
  create(@Body() createCampaignDto: CreateCampaignDto) {
    return this.campaignsService.create(createCampaignDto);
  }

  @Get()
  findAll() {
    return this.campaignsService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campaignsService.remove(+id);
  }
}
