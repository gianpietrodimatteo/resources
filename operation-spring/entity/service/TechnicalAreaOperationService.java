package com.prompt.operation.entity.service;

import com.prompt.entity.Project;
import com.prompt.operation.core.service.OperationService;
import com.prompt.operation.entity.dto.TechnicalAreaOperation;
import com.prompt.service.SecurityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class TechnicalAreaOperationService extends OperationService<TechnicalAreaOperation, Project> {

    private final static Logger logger = LoggerFactory.getLogger(TechnicalAreaOperationService.class);
    private final ApplicationEventPublisher applicationEventPublisher;

    @Autowired
    private SecurityService securityService;

    public TechnicalAreaOperationService(ApplicationEventPublisher applicationEventPublisher) {
        this.applicationEventPublisher = applicationEventPublisher;
    }

    private byte[] sumTotalRealized(Project project) {
        final BigDecimal[] totalValue = {new BigDecimal(0)};
        final BigDecimal[] epTotalValue = {null};
        project.getExpenseReports().forEach(expenseReport -> {
            if (expenseReport.getTotalValue() != null) {
                epTotalValue[0] = this.securityService.getCurrencyValueDecrypted(expenseReport.getTotalValue());
                totalValue[0] = totalValue[0].add(epTotalValue[0]);
            }
        });
        return this.securityService.encryptBigDecimal(totalValue[0]);
    }

    private byte[] sumTotalPaid(Project project) {
        final BigDecimal[] totalValue = {new BigDecimal(0)};
        final BigDecimal[] pTotalValue = {null};
        project.getPayments().forEach(payment -> {
            if (!payment.isDeleted() && payment.getInvoiceValue() != null) {
                pTotalValue[0] = this.securityService.getCurrencyValueDecrypted(payment.getInvoiceValue());
                totalValue[0] = totalValue[0].add(pTotalValue[0]);
            }
        });
        return this.securityService.encryptBigDecimal(totalValue[0]);
    }

    public TechnicalAreaOperation createOperation(Project project) {
        return new TechnicalAreaOperation(
            LocalDateTime.now(),
            project.getTechnicalArea().getName(),
            new Integer(1),
            sumTotalPaid(project),
            sumTotalRealized(project),
            project.getBudget().getTotalValue()
        );
    }

    public TechnicalAreaOperation deleteOperation(Project project) {
        return new TechnicalAreaOperation(
            LocalDateTime.now(),
            project.getTechnicalArea().getName(),
            new Integer(-1),
            securityService.negateCurrencyValue(sumTotalPaid(project)),
            securityService.negateCurrencyValue(sumTotalRealized(project)),
            securityService.negateCurrencyValue(project.getBudget().getTotalValue())
        );
    }

    public TechnicalAreaOperation updateOperation(Project oldProject, Project newProject) {
        return new TechnicalAreaOperation(
            LocalDateTime.now(),
            newProject.getTechnicalArea().getName(),
            new Integer(0),
            securityService.subtractCurrencyValue(sumTotalPaid(newProject), sumTotalPaid(oldProject)),
            securityService.subtractCurrencyValue(sumTotalRealized(newProject), sumTotalRealized(oldProject)),
            securityService.subtractCurrencyValue(newProject.getBudget().getTotalValue(), oldProject.getBudget().getTotalValue())
        );
    }
}
