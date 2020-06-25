import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Space } from './space.entity';
import { Repository } from 'typeorm';
import { SpaceAnalysisService } from './space-analysis.service';
import { YN } from 'src/common';

@Injectable()
export class SpaceAnalysisSenderService extends BaseService {
  constructor(
    @InjectRepository(Space) private readonly spaceRepo: Repository<Space>,
    private readonly spaceAnalysisService: SpaceAnalysisService,
  ) {
    super();
  }

  async setVicinityAnalysis(spaceNo: number, lat: string, lon: string) {
    console.log(spaceNo);
    const param = { lat: parseFloat(lat), lon: parseFloat(lon) };
    const start = new Date().getTime();
    console.log(`Started: ${start}`);
    const result = await Promise.all([
      await this.spaceAnalysisService.avgStoreSales(param),
      await this.spaceAnalysisService.avgBizSales(param),
      await this.spaceAnalysisService.employeeRatio(param),
      await this.spaceAnalysisService.ageGroupDis(param),
      await this.spaceAnalysisService.dayDistribution(param),
      await this.spaceAnalysisService.genderDistribution(param),
    ]);

    const sendResult = {
      avgStoreSales: result[0], // 점포 주변의 평균 매출 현황
      avgYearStoreSales: result[0], // 점포 주변의 평균 연매출 현황을 볼 수 있습니다
      avgBizConSales: result[1], // 점포 주변의 업종(업태)별 월 평균 매출 현황
      employeeRatio: result[2], // 점포 주변의 직장인구, 비율
      ageGroupDis: result[3], // 연령대별 고객 분포를 볼 수 있으며 가장 높은 연령대를 표시
      dayDistribution: result[4], // 요일별 매출 분포를 볼 수 있으며 가장 높은 요일을 표시
      genderDistribution: this.__set_adjust_ratio(result[5]), // 성별 고객 분포를 볼 수 있으며 가장 높은 성별을 표시
      location: { lat, lon },
    };

    const space = await this.spaceRepo.findOne({
      where: { no: spaceNo, delYn: YN.NO },
    });
    if (!space) {
      throw new NotFoundException();
    }
    await this.spaceRepo
      .createQueryBuilder()
      .update(Space)
      .set({ vicinityInfo: sendResult })
      .where('no = :no', { no: spaceNo })
      .execute();
  }

  private __set_adjust_ratio(data) {
    if (data.hasOwnProperty('M') && data.hasOwnProperty('FM')) {
      const mRatio = parseFloat(data.M);
      const fmRatio = parseFloat(data.FM);
      if (!isNaN(mRatio) && !isNaN(fmRatio)) {
        const total = mRatio + fmRatio;
        data.FM = total > 1 ? String(1 - total + fmRatio) : String(fmRatio);
      }
    }
    return data;
  }
}
