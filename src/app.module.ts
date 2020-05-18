/* eslint-disable @typescript-eslint/no-unused-vars */
import * as path from 'path';
import { Module, CacheModule, HttpModule } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService, HttpConfigService } from './config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggingInterceptor } from './core';
import { CodeManagementModule } from './modules';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    HttpModule.registerAsync({ useClass: HttpConfigService }),
    CodeManagementModule
  ],
  controllers: [AppController],
  providers: [AppService,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    // {provide: APP_FILTER, useClass: HttpExceptionFilter}
  ],
})
export class AppModule { }
