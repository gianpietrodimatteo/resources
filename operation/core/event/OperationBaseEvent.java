package com.prompt.operation.core.event;

public class OperationBaseEvent<EntityOperation> {
    private EntityOperation operation;

    public OperationBaseEvent() {
    }

    public OperationBaseEvent(EntityOperation operation) {
        this.operation = operation;
    }

    public EntityOperation getOperation() {
        return operation;
    }

    public void setOperation(EntityOperation operation) {
        this.operation = operation;
    }
}
