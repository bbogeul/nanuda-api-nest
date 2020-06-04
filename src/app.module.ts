/* eslint-disable @typescript-eslint/no-unused-vars */
import * as path from 'path';
import { Module, CacheModule, HttpModule } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  TypeOrmConfigService,
  HttpConfigService,
  TypeOrm2ConfigService,
} from './config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggingInterceptor } from './core';
import {
  CodeManagementModule,
  AuthModule,
  NanudaUserModule,
  PopupModule,
  BrandModule,
  MenuModule,
  FoodCategoryModule,
  DashboardModule,
} from './modules';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrm2ConfigService,
    }),
    HttpModule.registerAsync({ useClass: HttpConfigService }),
    AuthModule,
    AdminModule,
    BrandModule,
    DashboardModule,
    FoodCategoryModule,
    MenuModule,
    NanudaUserModule,
    PopupModule,
    CodeManagementModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    // {provide: APP_FILTER, useClass: HttpExceptionFilter}
  ],
})
export class AppModule {}
