
import { Document } from 'mongoose';
import { FindOneParams } from '../domain/find-one-params';

export interface BaseControllerInterface<E extends Document, D> {

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    find(params): Promise<E[]>;

    create(dto: D): Promise<E>;

    read(id: FindOneParams): Promise<E>;

    update(id: FindOneParams, dto: D): Promise<E>;

    delete(id: FindOneParams): Promise<E>;

}
