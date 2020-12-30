package com.prompt.operation.core.event;

public class OperationBaseEvent<O> {
    private O operationDto;

    public OperationBaseEvent() {
    }

    public OperationBaseEvent(O operationDto) {
        this.operationDto = operationDto;
    }

    public O getOperationDto() {
        return operationDto;
    }

    public void setOperationDto(O operationDto) {
        this.operationDto = operationDto;
    }
}
