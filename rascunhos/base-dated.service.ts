
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CryptographyService } from '../../cryptography/cryptography.service';
import { DashboardLogger } from '../../logger/dashboard-logger.service';
import { TimeAnalysis } from '../domain/time-analysis.schema';
import { TotalAnnualParams } from '../domain/total-annual-params';
import { TotalAnnualDto } from '../domain/total-annual.dto';
import { BaseService } from './base.service';

@Injectable()
export class BaseDatedService<E extends TimeAnalysis, D> extends BaseService<E, D> {

    constructor(
        protected readonly bdModel: Model<E>,
        protected readonly logger: DashboardLogger,
        protected readonly loggerContext: string,
        protected readonly cryptographyService: CryptographyService,
    ) {
        super(bdModel, logger, loggerContext);
    }

    async totalAnnual(query: TotalAnnualParams): Promise<TotalAnnualDto[]> {
        this.logger.log('Fetching annual totals: ' + JSON.stringify(query));
        const payments = await this.bdModel.find({
            // Maior que ou igual, menor que ou igual
            'year': { $gte: Number(`${query.start}`), $lte: Number(`${query.end}`) }
        });
        const annualTotals: TotalAnnualDto[] = [];

        payments.forEach(payment => {
            // Se não já tem adiciona um novo ano
            if (!annualTotals.some(at => at.year === payment.year)) {
                annualTotals.push(new TotalAnnualDto(payment));
                // Se já tem adiciona ao ano já existente na lista
            } else {
                this.addMonthlySumToTotalAnnual(annualTotals.find(at => at.year === payment.year), payment);
            }
        });

        return annualTotals;
    }

    private addMonthlySumToTotalAnnual(dto: TotalAnnualDto, ta: E): void {
        if (dto.year === ta.year) {
            dto.totalAnnual = this.cryptographyService.add(dto.totalAnnual, ta.monthlySum);
        }
    }
}
