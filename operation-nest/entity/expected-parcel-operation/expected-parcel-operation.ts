import { IsBase64, IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { IsEncryptedNumber } from '../../../cryptography/is-encrypted-number';
import { OperationDto } from '../../core/domain/operation.dto';

export class ExpectedParcelOperation extends OperationDto {

    @IsNotEmpty()
    @IsInt()
    @Min(1900)
    @Max(2100)
    year: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(12)
    month: number;

    @IsNotEmpty()
    @IsBase64()
    @IsEncryptedNumber()
    monthlySum: string;

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor(data?: any) {
        super(data);
        this.year = data && data.year || null;
        this.month = data && data.month || null;
        this.monthlySum = data && data.montlhySum || null;
    }
}