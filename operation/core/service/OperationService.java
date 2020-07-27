package com.prompt.operation.core.service;

import org.springframework.beans.factory.annotation.Value;

import java.util.List;

public abstract class OperationService<O, E> {
    @Value("${operation.service.query.limit}")
    private int queryLimit;

    public void sendEvents() {
        listPending(queryLimit).forEach(this::publish);
    }

    protected abstract void publish(O operation);

    protected abstract List<O> listPending(int limit);

    protected abstract O createOperation(E entity);

    protected abstract O deleteOperation(E entity);

    protected abstract O updateOperation(E oldEntity, E newEntity);

}
