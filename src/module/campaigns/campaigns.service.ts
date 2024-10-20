import { BadRequestException, Body, ConflictException, HttpStatus, Injectable, Logger, Put, Version } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { campaign_master } from './entities/campaign.entity';
import { Not, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Constants } from 'src/shared/constants';
import { response } from 'src/shared/response.util';

@Injectable()
export class CampaignsService {
  private readonly logger = new Logger('CampaignsService');
  request: any;
  constructor(
    @InjectRepository(campaign_master)
    private campaignsRepository: Repository<campaign_master>,
    private configService: ConfigService,
  ) { }
  async create(createCampaignDto: CreateCampaignDto) {
    try {
      console.log('createCampaignDto---', createCampaignDto);
      if (createCampaignDto.id) {
        return await this.updateCampaign(createCampaignDto);
      } else {
        return await this.createCampaign(createCampaignDto);
      }
    } catch (err) {
      console.log('err---', err);
      this.logger.log(err);
      if (err instanceof BadRequestException) throw new BadRequestException(err.message);
      if (err instanceof ConflictException) throw new ConflictException(err.message);
      throw new BadRequestException(Constants.ResponseMessages.INTERNAL_SERVER_ERROR);
    }
  }

  async updateCampaign(createCampaignDto) {
    try {
      const isCampaignExist = await this.campaignsRepository.findOne({
        where: {
          id: Not(createCampaignDto.id),
          name: createCampaignDto.name,
          status: createCampaignDto.status,
          clicks: createCampaignDto.clicks,
          impressions: createCampaignDto.impressions,
          cost: createCampaignDto.cost,
        },
      });
      if (isCampaignExist) {
        throw new ConflictException(Constants.ResponseMessages.CAMPAIGN_ALREADY_EXIST);
      }
      const campaign = await this.campaignsRepository.update(
        { id: createCampaignDto.id },
        {
          name: createCampaignDto.name,
          status: createCampaignDto.status,
          clicks: createCampaignDto.clicks,
          impressions: createCampaignDto.impressions,
          cost: createCampaignDto.cost,
          is_active: createCampaignDto.is_active,
        },
      );
      return response(HttpStatus.OK, Constants.ResponseMessages.CAMPAIGN_UPDATE_SUCCESS, {
        ...campaign,
      });
    } catch (err) {
      console.log('createCampaign err---', err);
      this.logger.log(err);
    }    
  }

  async createCampaign(createCampaignDto) {
    try { 
      const isCampaignExist = await this.campaignsRepository.findOne({
        where: {
          name: createCampaignDto.name,
          status: createCampaignDto.status,
          clicks: createCampaignDto.clicks,
          impressions: createCampaignDto.impressions,
          cost: createCampaignDto.cost,
        },
      });
      if (isCampaignExist) {
        throw new ConflictException(Constants.ResponseMessages.CAMPAIGN_ALREADY_EXIST);
      }    
      await this.campaignsRepository.save({
        name: createCampaignDto.name,
        status: createCampaignDto.status,
        clicks: createCampaignDto.clicks,
        impressions: createCampaignDto.impressions,
        cost: createCampaignDto.cost,
        is_active: createCampaignDto.is_active,
      });
      return response(HttpStatus.OK, Constants.ResponseMessages.CAMPAIGN_CREATE_SUCCESS, {});
    } catch (err) {
      console.log('createCampaign err---', err);
      this.logger.log(err);
    }    
  }

  findAll(): Promise<campaign_master[]> {
    return this.campaignsRepository.find();
  }

  async remove(id: number) {
    try {
      await this.campaignsRepository.update(
        { id: id },
        {
          deleted_at: new Date(),
        },
      );
      return response(HttpStatus.OK, Constants.ResponseMessages.CAMPAIGN_DELETE_SUCCESS, {});
    } catch (error) {
      this.logger.log(error);
      throw new BadRequestException(Constants.ResponseMessages.INTERNAL_SERVER_ERROR);
    }
  }
}
