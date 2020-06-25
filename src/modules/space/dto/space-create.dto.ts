import { BaseDto } from 'src/core';
import { Space } from '../space.entity';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { SPACE_TYPE, SPACE } from 'src/shared';
import { YN, Default } from 'src/common';

export class SpaceCreateDto extends BaseDto<SpaceCreateDto>
  implements Partial<Space> {
  constructor(partial?: any) {
    super();
  }

  // token에서 할당 받도록 서비스에서 처리한다.
  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  nanudaUserNo?: number;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  lat: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  lon: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  zoneCode?: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  address: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  detailAddress?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  addressType?: string;

  @ApiPropertyOptional({ enum: SPACE_TYPE })
  @IsOptional()
  @Expose()
  @IsEnum(SPACE_TYPE)
  spaceTypeNo?: SPACE_TYPE;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  spaceInfo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  bCode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  bName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  bName1?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  bName2?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  sido?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  sigungu?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  sigunguCode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  userLanguageType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  query?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  buildingName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  buildingCode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  apartment?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  jibunAddress?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  jibunAddressEnglish?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  roadAddress?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  roadAddressEnglish?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  autoRoadAddress?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  autoRoadAddressEnglish?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  autoJibunAddress?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  autoJibunAddressEnglish?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  userSelectedType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  noSelected?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  hName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  roadNameCode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  roadName?: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  name: string;

  @ApiPropertyOptional({ enum: YN })
  @IsEnum(YN)
  @IsOptional()
  @Default(YN.YES)
  @Expose()
  genResYn?: YN;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  floor?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  size?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  seat?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  deposit?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  monthlyFee?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  monthlyRent?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  expiryDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  etc?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  rentalType?: SPACE.ALL | SPACE.KITCHEN | SPACE.TIME;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  rentalDateType?: SPACE.WEEKEND | SPACE.WEEKDAY;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  rentalContent?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  rentalHopeFee?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  rentalFee?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  rentalStartDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  rentalEndDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  @Default(YN.NO)
  rentalExpYn?: YN;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  bFireball?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  sFireball?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  amenityIds?: number[];

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  deliverySpaceOptionsIds?: number[];
}
