package com.prompt.operation;

import com.prompt.operation.core.event.DashboardStatusEvent;
import com.prompt.operation.entity.event.CostElementOperationCommitEvent;
import com.prompt.operation.entity.event.CostElementOperationEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
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
    public void sendExpenseOperationAfterCommit(CostElementOperationCommitEvent event) throws ExecutionException, InterruptedException {
        dashboardUpdateService.sendCostElementOperation(event.getOperation());
    }

    @Async
    @EventListener
    public void sendExpenseOperationScheduled(CostElementOperationEvent event) throws ExecutionException, InterruptedException {
        dashboardUpdateService.sendCostElementOperation(event.getOperation());
    }

    @Async
    @EventListener
    public void checkDashboardStatus(DashboardStatusEvent event) throws ExecutionException, InterruptedException {
        if (event.isWalletDashboardUp())
            return;
        dashboardUpdateService.checkDashboardStatus();
    }


}
