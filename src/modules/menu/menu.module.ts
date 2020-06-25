import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './menu.entity';
import { AdminMenuController } from './admin-menu.controller';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { Brand } from '../brand/brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, Menu])],
  controllers: [AdminMenuController, MenuController],
  providers: [MenuService],
  exports: [],
})
export class MenuModule {}
