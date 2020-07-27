
import { Controller, Get, Query } from '@nestjs/common';
import { DashboardLogger } from '../../logger/dashboard-logger.service';
import { TimeAnalysis } from '../domain/time-analysis.schema';
import { TotalAnnualParams } from '../domain/total-annual-params';
import { TotalAnnualDto } from '../domain/total-annual.dto';
import { BaseDatedService } from '../service/base-dated.service';
import { BaseController } from './base.controller';


@Controller()
export class BaseDatedController<E extends TimeAnalysis, D> extends BaseController<E, D>  {

    constructor(
        protected readonly service: BaseDatedService<E, D>,
        protected readonly logger: DashboardLogger,
        protected readonly loggerContext: string
    ) {
        super(service, logger, loggerContext);
    }

    @Get('total-annual')
    async totalAnnual(@Query() params: TotalAnnualParams): Promise<TotalAnnualDto[]> {
        this.logger.debug('Request to fetch annual totals: ' + JSON.stringify(params));
        return this.service.totalAnnual(params);
    }

}
