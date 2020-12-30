import { IsDateString } from 'class-validator';

export class OperationDto {

    // @IsNotEmpty()
    @IsDateString()
    occurredAt: Date;

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor(data?: any) {
        this.occurredAt = data && data.occurredAt || null;
    }
}
