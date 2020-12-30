package com.prompt.operation.entity.event;

import com.prompt.operation.core.event.OperationBaseEvent;
import com.prompt.operation.entity.dto.TechnicalAreaOperation;

public class TechnicalAreaOperationCommitEvent extends OperationBaseEvent<TechnicalAreaOperation> {

    public TechnicalAreaOperationCommitEvent() {
    }

    public TechnicalAreaOperationCommitEvent(TechnicalAreaOperation technicalAreaOperation) {
        super(technicalAreaOperation);
    }
}
