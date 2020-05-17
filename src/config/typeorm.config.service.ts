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
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql' as 'mysql',
      host: env.DB_HOST,
      port: Number(env.DB_PORT),
      username: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_DATABASE,
      keepConnectionAlive: true,
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
