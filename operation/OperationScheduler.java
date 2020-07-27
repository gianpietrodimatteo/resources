package com.prompt.operation;

import com.prompt.operation.core.event.DashboardStatusEvent;
import com.prompt.operation.entity.service.CostElementOperationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class OperationScheduler {
    private final static Logger logger = LoggerFactory.getLogger(OperationScheduler.class);
    private final ApplicationEventPublisher applicationEventPublisher;
    private Boolean dashboardServerIsUp;

    @Autowired
    private CostElementOperationService costElementOperationService;

    public OperationScheduler(ApplicationEventPublisher applicationEventPublisher) {
        this.applicationEventPublisher = applicationEventPublisher;
        this.dashboardServerIsUp = false;
    }

    @Scheduled(initialDelayString = "${operation.schedule.delay}", fixedRateString = "${operation.schedule.delay}")
    public void sendAllEvents() {
        logger.trace("Shooting scheduled events.");
        if (dashboardServerIsUp) {
            // Adicione aqui o sendEvents do operation service que acabou de criar!
            costElementOperationService.sendEvents();
        } else {
            applicationEventPublisher.publishEvent(new DashboardStatusEvent(false));
        }
    }

    @EventListener
    public void dashboardStatusUpdate(DashboardStatusEvent event) {
        this.dashboardServerIsUp = event.isWalletDashboardUp();
    }

}
