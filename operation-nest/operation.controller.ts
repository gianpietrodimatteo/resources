import { Body, Controller, HttpService, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CostElementOperation } from 'src/operation/entity/cost-element-operation/cost-element-operation';
import { CostElement } from '../entity/cost-element/domain/cost-element.schema';
import { CostElementService } from '../entity/cost-element/service/cost-element.service';
import { ExpectedParcel } from '../entity/expected-parcel/domain/expected-parcel.schema';
import { ExpectedParcelService } from '../entity/expected-parcel/service/expected-parcel.service';
import { Payment } from '../entity/payment/domain/payment.shema';
import { PaymentService } from '../entity/payment/service/payment.service';
import { RealizedParcel } from '../entity/realized-parcel/domain/realized-parcel.shema';
import { RealizedParcelService } from '../entity/realized-parcel/service/realized-parcel.service';
import { TechnicalArea } from '../entity/technical-area/domain/technical-area.schema';
import { TechnicalAreaService } from '../entity/technical-area/service/technical-area.service';
import { DashboardLogger } from '../logger/dashboard-logger.service';
import { DashboardResetDto } from './core/domain/dashboard-reset.dto';
import { CostElementOperationService } from './entity/cost-element-operation/cost-element-operation.service';
import { ExpectedParcelOperation } from './entity/expected-parcel-operation/expected-parcel-operation';
import { ExpectedParcelOperationService } from './entity/expected-parcel-operation/expected-parcel-operation.service';
import { PaymentOperation } from './entity/payment-operation/payment-operation';
import { PaymentOperationService } from './entity/payment-operation/payment-operation.service';
import { RealizedParcelOperation } from './entity/realized-parcel-operation/realized-parcel-operation';
import { RealizedParcelOperationService } from './entity/realized-parcel-operation/realized-parcel-operation.service';
import { TechnicalAreaOperation } from './entity/technical-area-operation/technical-area-operation';
import { TechnicalAreaOperationService } from './entity/technical-area-operation/technical-area-operation.service';


@Controller('operation')
export class OperationController {

    private readonly resetUri = 'https://localhost:8080/api/wallet-dashboard/reset';

    constructor(
        private readonly ceService: CostElementService,
        private readonly epService: ExpectedParcelService,
        private readonly pService: PaymentService,
        private readonly rpService: RealizedParcelService,
        private readonly taService: TechnicalAreaService,
        private readonly ceoService: CostElementOperationService,
        private readonly epoService: ExpectedParcelOperationService,
        private readonly poService: PaymentOperationService,
        private readonly rpoService: RealizedParcelOperationService,
        private readonly taoService: TechnicalAreaOperationService,
        private readonly httpService: HttpService,
        private readonly logger: DashboardLogger
    ) {
        this.logger.setContext('OperationController')
    }

    @Post('cost-element')
    async receiveCostElementOperation(@Body() operation: CostElementOperation): Promise<CostElement> {
        this.logger.debug('Received new operation: ' + JSON.stringify(operation));
        return this.ceoService.apply(operation);
    }

    @Post('expected-parcel')
    async receiveExpectedParcelOperation(@Body() operation: ExpectedParcelOperation): Promise<ExpectedParcel> {
        this.logger.debug('Received new operation: ' + JSON.stringify(operation));
        return this.epoService.apply(operation);
    }

    @Post('payment')
    async receivePaymentOperation(@Body() operation: PaymentOperation): Promise<Payment> {
        this.logger.debug('Received new operation: ' + JSON.stringify(operation));
        return this.poService.apply(operation);
    }

    @Post('realized-parcel')
    async receiveRealizedParcelOperation(@Body() operation: RealizedParcelOperation): Promise<RealizedParcel> {
        this.logger.debug('Received new operation: ' + JSON.stringify(operation));
        return this.rpoService.apply(operation);
    }

    @Post('technical-area')
    async receiveTechnicalAreaOperation(@Body() operation: TechnicalAreaOperation): Promise<TechnicalArea> {
        this.logger.debug('Received new operation: ' + JSON.stringify(operation));
        return this.taoService.apply(operation);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @Post('reset')
    async reset(@Body() response: DashboardResetDto, @Res() res: Response) {
        this.logger.debug('Received request for reseting dashboard counting: ' + JSON.stringify(response));

        if (response.costElementOperations.length > 0) {
            await this.ceService.deleteAll();
            response.costElementOperations.forEach(operation => this.ceoService.apply(operation));
        }
        if (response.expectedParcelOperations.length > 0) {
            await this.epService.deleteAll();
            response.expectedParcelOperations.forEach(operation => this.epoService.apply(operation));
        }
        if (response.paymentOperations.length > 0) {
            await this.pService.deleteAll();
            response.paymentOperations.forEach(operation => this.poService.apply(operation));
        }
        if (response.realizedParcelOperations.length > 0) {
            await this.rpService.deleteAll();
            response.realizedParcelOperations.forEach(operation => this.rpoService.apply(operation));
        }
        if (response.technicalAreaOperations.length > 0) {
            await this.taService.deleteAll();
            response.technicalAreaOperations.forEach(operation => this.taoService.apply(operation));
        }

        res.status(HttpStatus.OK).send('Dashboard reset successfully.');
    }
}
