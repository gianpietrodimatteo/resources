package com.prompt.operation.entity.event;

import com.prompt.operation.core.event.OperationBaseEvent;
import com.prompt.operation.entity.dto.RealizedParcelOperation;

public class RealizedParcelOperationCommitEvent extends OperationBaseEvent<RealizedParcelOperation> {

    public RealizedParcelOperationCommitEvent() {
    }

    public RealizedParcelOperationCommitEvent(RealizedParcelOperation realizedParcelOperation) {
        super(realizedParcelOperation);
    }
}
