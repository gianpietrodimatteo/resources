import { CostElementOperation } from '../../entity/cost-element-operation/cost-element-operation';
import { ExpectedParcelOperation } from '../../entity/expected-parcel-operation/expected-parcel-operation';
import { PaymentOperation } from '../../entity/payment-operation/payment-operation';
import { RealizedParcelOperation } from '../../entity/realized-parcel-operation/realized-parcel-operation';
import { TechnicalAreaOperation } from '../../entity/technical-area-operation/technical-area-operation';

export class DashboardResetDto {

    costElementOperations: CostElementOperation[];
    expectedParcelOperations: ExpectedParcelOperation[];
    paymentOperations: PaymentOperation[];
    realizedParcelOperations: RealizedParcelOperation[];
    technicalAreaOperations: TechnicalAreaOperation[];

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor(data?: any) {
        this.costElementOperations = data && data.costElementOperations || [];
        this.expectedParcelOperations = data && data.expectedParcelOperations || [];
        this.paymentOperations = data && data.paymentOperations || [];
        this.realizedParcelOperations = data && data.realizedParcelOperations || [];
        this.technicalAreaOperations = data && data.technicalAreaOperations || [];
    }

}
