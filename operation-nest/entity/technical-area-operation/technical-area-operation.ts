import { IsBase64, IsInt, IsNotEmpty } from 'class-validator';
import { IsEncryptedNumber } from '../../../cryptography/is-encrypted-number';
import { OperationDto } from '../../core/domain/operation.dto';


export class TechnicalAreaOperation extends OperationDto {

    @IsNotEmpty()
    name: string;

    @IsInt()
    numberOfProjects: number;

    @IsBase64()
    @IsEncryptedNumber()
    totalPaid: string;

    @IsBase64()
    @IsEncryptedNumber()
    totalRealized: string;

    @IsBase64()
    @IsEncryptedNumber()
    totalBudget: string;

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor(data?: any) {
        super(data);
        this.name = data && data.name || null;
        this.numberOfProjects = data && data.numberOfProjects || 0;
        this.totalPaid = data && data.totalPaid || null;
        this.totalRealized = data && data.totalRealized || null;
        this.totalBudget = data && data.totalBudget || null;
    }

}
