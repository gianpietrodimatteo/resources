package com.prompt.operation.entity.service;

import com.prompt.entity.Benefit;
import com.prompt.operation.core.service.OperationService;
import com.prompt.operation.entity.dto.CostElementOperation;
import com.prompt.service.SecurityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CostElementOperationService extends OperationService<CostElementOperation, Benefit> {
    private final static Logger logger = LoggerFactory.getLogger(CostElementOperationService.class);
    private final ApplicationEventPublisher applicationEventPublisher;

    @Autowired
    private SecurityService securityService;

    public CostElementOperationService(ApplicationEventPublisher applicationEventPublisher) {
        this.applicationEventPublisher = applicationEventPublisher;
    }

    public CostElementOperation createOperation(Benefit benefit) {
        return new CostElementOperation(
            LocalDateTime.now(),
            benefit.getCostElement().getName(),
            benefit.getCostElement().getSymbol(),
            benefit.getTotalValue()
        );
    }

    public CostElementOperation deleteOperation(Benefit benefit) {
        return new CostElementOperation(
            LocalDateTime.now(),
            benefit.getCostElement().getName(),
            benefit.getCostElement().getSymbol(),
            securityService.negateCurrencyValue(benefit.getTotalValue())
        );
    }

    public CostElementOperation updateOperation(Benefit oldBenefit, Benefit newBenefit) {
        return new CostElementOperation(
            LocalDateTime.now(),
            newBenefit.getCostElement().getName(),
            newBenefit.getCostElement().getSymbol(),
            securityService.subtractCurrencyValue(newBenefit.getTotalValue(), oldBenefit.getTotalValue())
        );
    }

}
