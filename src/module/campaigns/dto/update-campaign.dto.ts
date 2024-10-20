import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCampaignDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim();
    } else {
      return value;
    }
  })
  @ApiProperty({
    description: 'paused',
    example: 'paused',
  })
  status: string;

}

