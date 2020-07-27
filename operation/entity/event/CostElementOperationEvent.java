package com.prompt.operation.entity.event;


import com.prompt.operation.core.event.OperationBaseEvent;
import com.prompt.operation.entity.domain.CostElementOperation;

public class CostElementOperationEvent extends OperationBaseEvent<CostElementOperation> {

    public CostElementOperationEvent() {
    }

    public CostElementOperationEvent(CostElementOperation costElementOperation) {
        super(costElementOperation);
    }
}
