package com.prompt.operation.core.service;

import org.springframework.beans.factory.annotation.Value;

import java.util.List;

public abstract class OperationService<O, E> {

    protected abstract O createOperation(E entity);

    protected abstract O deleteOperation(E entity);

    protected abstract O updateOperation(E oldEntity, E newEntity);

}
