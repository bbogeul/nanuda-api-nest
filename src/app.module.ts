import * as path from 'path';
import { Module, CacheModule, HttpModule } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
