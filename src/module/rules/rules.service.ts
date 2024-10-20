import { Injectable, Logger } from '@nestjs/common';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { rule_master } from './entities/rule.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RulesService {
  private readonly logger = new Logger('RulesService');
  request: any;
  constructor(
    @InjectRepository(rule_master)
    private campaignsRepository: Repository<rule_master>,
    private configService: ConfigService,
  ) { }

  create(createRuleDto: CreateRuleDto) {
    return 'This action adds a new rule';
  }

  findAll() {
    return `This action returns all rules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rule`;
  }

  update(id: number, updateRuleDto: UpdateRuleDto) {
    return `This action updates a #${id} rule`;
  }

  remove(id: number) {
    return `This action removes a #${id} rule`;
  }
}
