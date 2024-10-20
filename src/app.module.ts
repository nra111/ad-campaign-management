import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ormConfig } from 'ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignsModule } from './module/campaigns/campaigns.module';
import { RulesModule } from './module/rules/rules.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config available globally in the app
      envFilePath: '.env', // Path to the .env file (default is `.env` at the root)
    }),
    TypeOrmModule.forRoot(ormConfig),
    CampaignsModule,
    RulesModule,
    // other modules...
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
