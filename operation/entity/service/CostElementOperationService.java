package com.prompt.operation.entity.service;

import com.prompt.entity.Benefit;
import com.prompt.operation.core.enums.Status;
import com.prompt.operation.core.service.OperationService;
import com.prompt.operation.entity.domain.CostElementOperation;
import com.prompt.operation.entity.event.CostElementOperationEvent;
import com.prompt.operation.entity.repository.CostElementOperationRepository;
import com.prompt.service.SecurityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class CostElementOperationService extends OperationService<CostElementOperation, Benefit> {
    private final static Logger logger = LoggerFactory.getLogger(CostElementOperationService.class);
    private final ApplicationEventPublisher applicationEventPublisher;

    @Autowired
    private CostElementOperationRepository costElementOperationRepository;

    @Autowired
    private SecurityService securityService;

    public CostElementOperationService(ApplicationEventPublisher applicationEventPublisher) {
        this.applicationEventPublisher = applicationEventPublisher;
    }

    public void sendEvents() {
        logger.trace("Shooting saved cost element type operations scheduled events.");
        super.sendEvents();
    }

    protected void publish(CostElementOperation operation) {
        applicationEventPublisher.publishEvent(new CostElementOperationEvent(operation));
    }

    protected List<CostElementOperation> listPending(int limit) {
        Pageable topPage = PageRequest.of(0, limit);
        return costElementOperationRepository.findByStatus(Status.PENDING, topPage);
    }

    public CostElementOperation createOperation(Benefit benefit) {
        return new CostElementOperation(benefit.getCostElement().getName(), benefit.getCostElement().getSymbol(), benefit.getTotalValue());
    }

    public CostElementOperation deleteOperation(Benefit benefit) {
        BigDecimal budgetChange = securityService.getCurrencyValueDecrypted(benefit.getTotalValue()).multiply(new BigDecimal(-1));
        return new CostElementOperation(benefit.getCostElement().getName(), benefit.getCostElement().getSymbol(), securityService.encryptBigDecimal(budgetChange));
    }

    public CostElementOperation updateOperation(Benefit oldBenefit, Benefit newBenefit) {
        BigDecimal oldBudget = securityService.getCurrencyValueDecrypted(oldBenefit.getTotalValue());
        BigDecimal newBudget = securityService.getCurrencyValueDecrypted(newBenefit.getTotalValue());
        BigDecimal budgetChange = newBudget.subtract(oldBudget);
        return new CostElementOperation(newBenefit.getCostElement().getName(), newBenefit.getCostElement().getSymbol(), securityService.encryptBigDecimal(budgetChange));
    }

}
