import { IsNotEmpty, MaxLength } from 'class-validator';
import { OperationDto } from 'src/operation/core/domain/operation.dto';
import { IsEncryptedNumber } from '../../../cryptography/is-encrypted-number';

export class CostElementOperation extends OperationDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @MaxLength(3)
    symbol: string;

    @IsNotEmpty()
    @IsEncryptedNumber()
    totalBudget: string;

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor(data?: any) {
        super(data);
        this.name = data && data.name || null;
        this.symbol = data ? data.symbol : null;
        this.totalBudget = data && data.totalBudget || null;
    }
}
