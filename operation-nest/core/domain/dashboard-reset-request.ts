
export class DashboardResetRequest {

    costElement: boolean;
    expectedParcel: boolean;
    payment: boolean;
    realizedParcel: boolean;
    technicalArea: boolean;

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor(data?: any) {
        this.costElement = data && data.costElement || false;
        this.expectedParcel = data && data.expectedParcel || false;
        this.payment = data && data.payment || false;
        this.realizedParcel = data && data.realizedParcel || false;
        this.technicalArea = data && data.technicalArea || false;
    }

}
