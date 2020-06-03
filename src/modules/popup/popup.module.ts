import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Popup } from './popup.entity';
import { PopupService } from './popup.service';
import { AdminPopupController } from './admin-popup.controller';
import { PopupController } from './popup.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Popup])],
  controllers: [AdminPopupController, PopupController],
  providers: [PopupService],
  exports: [],
})
export class PopupModule {}
