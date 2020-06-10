/* eslint-disable @typescript-eslint/no-unused-vars */
import * as path from 'path';
import { Module, CacheModule, HttpModule } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService, HttpConfigService } from './config';
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
  NanudaUserUpdateHistoryModule,
  ProductConsultModule,
  ProductModule,
  SpaceTypeBrandMapperModule,
  RevenueModule,
} from './modules';
import { AdminModule } from './modules/admin/admin.module';
import { PaymentList } from './modules/dashboard/dashboard.entity';
require('dotenv').config();
const env = process.env;
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    // connect to second database
    TypeOrmModule.forRoot({
      name: 'kitchen',
      type: 'mariadb' as 'mariadb',
      host: env.REV_DB_HOST,
      port: Number(env.REV_DB_PORT),
      username: env.REV_DB_USERNAME,
      password: env.REV_DB_PASSWORD,
      database: env.REV_DB_NAME,
      // won't need to keep alive
      //   keepConnectionAlive: true,
      bigNumberStrings: false,
      supportBigNumbers: false,
      entities: [PaymentList],
      // migrations: [],
      // cli: {},
      // subscribers: [],
      //   Do not turn to true!!!! 나누다 키친 데이터 다 날라가요 ~ ㅠㅠ
      synchronize: false,
    }),
    HttpModule.registerAsync({ useClass: HttpConfigService }),
    AuthModule,
    AdminModule,
    BrandModule,
    CodeManagementModule,
    DashboardModule,
    FoodCategoryModule,
    MenuModule,
    NanudaUserModule,
    NanudaUserUpdateHistoryModule,
    PopupModule,
    ProductModule,
    ProductConsultModule,
    RevenueModule,
    SpaceTypeBrandMapperModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    // {provide: APP_FILTER, useClass: HttpExceptionFilter}
  ],
})
export class AppModule {}
