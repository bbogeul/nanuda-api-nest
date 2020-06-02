import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Popup } from './popup.entity';
import { PopupService } from './popup.service';
import { AdminPopupController } from './admin-popup.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Popup])],
  controllers: [AdminPopupController],
  providers: [PopupService],
  exports: [],
})
export class PopupModule {}
