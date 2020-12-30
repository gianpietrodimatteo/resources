package com.prompt.operation.entity.event;

import com.prompt.operation.core.event.OperationBaseEvent;
import com.prompt.operation.entity.dto.CostElementOperation;

public class CostElementOperationCommitEvent extends OperationBaseEvent<CostElementOperation> {
    public CostElementOperationCommitEvent() {
    }

    public CostElementOperationCommitEvent(CostElementOperation costElementOperation) {
        super(costElementOperation);
    }
}
