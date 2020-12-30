
import { Injectable } from '@nestjs/common';
import { Document } from 'mongoose';
import { BaseService } from '../../core/service/base.service';
import { DashboardLogger } from '../../logger/dashboard-logger.service';

@Injectable()
export class BaseOperationService<E extends Document, D, O> {

    constructor(
        protected readonly service: BaseService<E, D>,
        protected readonly logger: DashboardLogger,
        protected readonly loggerContext: string
    ) {
        this.logger.setContext(loggerContext);
    }

    async apply(operation: O): Promise<E> {
        this.logger.log('Applying operation ' + JSON.stringify(operation));

        const searchResult = await (this.service.find({ name: `${operation.name}`, symbol: `${operation.symbol}` }));

        if (searchResult.length === 0) {
            return this.service.create(new D(operation));
        } else {
            return this.service.update(searchResult[0]._id, this.applyOperationAndReturnDto(operation, searchResult[0]));
        }
    }

    private applyOperationAndReturnDto(operation: O, entity: E): D {

    }


}
