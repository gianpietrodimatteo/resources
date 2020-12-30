package com.prompt.operation;

import com.prompt.operation.entity.event.CostElementOperationCommitEvent;
import com.prompt.operation.entity.event.PaymentOperationCommitEvent;
import com.prompt.operation.entity.event.RealizedParcelOperationCommitEvent;
import com.prompt.operation.entity.event.TechnicalAreaOperationCommitEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;

import java.util.concurrent.ExecutionException;

@Component
public class OperationEventListener {

    private static final Logger logger = LoggerFactory.getLogger(OperationEventListener.class);

    @Autowired
    private DashboardUpdateService dashboardUpdateService;

    @Async
    @TransactionalEventListener
    public void sendCostElementOperation(CostElementOperationCommitEvent event) throws ExecutionException, InterruptedException {
        dashboardUpdateService.sendCostElementOperation(event.getOperationDto());
    }

    @Async
    @TransactionalEventListener
    public void sendTechnicalAreaOperation(TechnicalAreaOperationCommitEvent event) throws ExecutionException, InterruptedException {
        dashboardUpdateService.sendTechnicalAreaOperation(event.getOperationDto());
    }

    @Async
    @TransactionalEventListener
    public void sendPaymentOperation(PaymentOperationCommitEvent event) throws ExecutionException, InterruptedException {
        dashboardUpdateService.sendPaymentOperation(event.getOperationDto());
    }

    @Async
    @TransactionalEventListener
    public void sendRealizedParcelOperation(RealizedParcelOperationCommitEvent event) throws ExecutionException, InterruptedException {
        dashboardUpdateService.sendRealizedParcelOperation(event.getOperationDto());
    }

}
