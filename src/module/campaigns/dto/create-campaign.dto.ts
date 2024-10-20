import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateCampaignDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: 'ID',
    example: 1,
  })
  id: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Name',
    example: 'campaigns 1',
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'paused',
    example: 'paused',
  })
  status: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: 'clicks',
    example: 1,
  })
  clicks: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: 'impressions',
    example: 1,
  })
  impressions: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: 'cost',
    example: 1,
  })
  cost: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'Is Active status',
    example: true,
  })
  is_active: boolean;
}
