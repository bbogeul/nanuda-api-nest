/* eslint-disable @typescript-eslint/no-unused-vars */
import * as path from 'path';
import { Module, CacheModule, HttpModule } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService, HttpConfigService } from './config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggingInterceptor } from './core';
import { CodeManagementModule, AuthModule, NanudaUserModule } from './modules';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    HttpModule.registerAsync({ useClass: HttpConfigService }),
    CodeManagementModule,
    AdminModule,
    AuthModule,
    NanudaUserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    // {provide: APP_FILTER, useClass: HttpExceptionFilter}
  ],
})
export class AppModule {}
