import { Module } from '@nestjs/common';
import { RulesService } from './rules.service';
import { RulesController } from './rules.controller';
import { rule_master } from './entities/rule.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([rule_master]),
  ],
  controllers: [RulesController],
  providers: [RulesService],
})
export class RulesModule {}
