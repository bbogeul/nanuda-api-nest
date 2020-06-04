/* eslint-disable @typescript-eslint/no-unused-vars */
import Debug from 'debug';
import { basename } from 'path';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
// for webpack:hmr
import { getMetadataArgsStorage } from 'typeorm';
require('dotenv').config();
const debug = Debug(`app:${basename(__dirname)}:${basename(__filename)}`);
const env = process.env;
@Injectable()
export class TypeOrm2ConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: 'database2',
      type: 'mariadb' as 'mariadb',
      host: env.REV_DB_HOST,
      port: Number(env.REV_DB_PORT),
      username: env.REV_DB_USERNAME,
      password: env.REV_DB_PASSWORD,
      database: env.REV_DB_NAME,
      //   keepConnectionAlive: true,
      bigNumberStrings: false,
      supportBigNumbers: false,
      entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
      migrations: [],
      cli: {},
      subscribers: [],
      //   Do not turn to true!!!! 나누다 키친 데이터 다 날라가요 ~ ㅠㅠ
      synchronize: false,
    };
  }
}
