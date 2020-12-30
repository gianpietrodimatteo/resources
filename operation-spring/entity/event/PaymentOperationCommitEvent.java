package com.prompt.operation.entity.event;

import com.prompt.operation.core.event.OperationBaseEvent;
import com.prompt.operation.entity.dto.PaymentOperation;

public class PaymentOperationCommitEvent extends OperationBaseEvent<PaymentOperation> {
    public PaymentOperationCommitEvent() {
    }

    public PaymentOperationCommitEvent(PaymentOperation paymentOperation) {
        super(paymentOperation);
    }
}
