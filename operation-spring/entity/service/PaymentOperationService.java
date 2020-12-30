package com.prompt.operation.entity.service;

import com.prompt.entity.Payment;
import com.prompt.operation.core.service.OperationService;
import com.prompt.operation.entity.dto.PaymentOperation;
import com.prompt.service.SecurityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class PaymentOperationService extends OperationService<PaymentOperation, Payment> {
    private static final Logger logger = LoggerFactory.getLogger(PaymentOperationService.class);
    private final ApplicationEventPublisher applicationEventPublisher;

    @Autowired
    private SecurityService securityService;

    public PaymentOperationService(ApplicationEventPublisher applicationEventPublisher) {
        this.applicationEventPublisher = applicationEventPublisher;
    }

    public PaymentOperation createOperation(Payment payment) {
        return new PaymentOperation(LocalDateTime.now(), Long.valueOf(payment.getDatePayment().getMonthValue()),
            Long.valueOf(payment.getDatePayment().getYear()), payment.getInvoiceValue());
    }

    public PaymentOperation deleteOperation(Payment payment) {
        BigDecimal budgetChange = securityService.getCurrencyValueDecrypted(payment.getInvoiceValue()).multiply(new BigDecimal(-1));
        return new PaymentOperation(LocalDateTime.now(), Long.valueOf(payment.getDatePayment().getMonthValue()),
            Long.valueOf(payment.getDatePayment().getYear()), securityService.encryptBigDecimal(budgetChange));
    }

    public PaymentOperation updateOperation(Payment oldPayment, Payment newPayment) {
        BigDecimal oldBudget = securityService.getCurrencyValueDecrypted(oldPayment.getInvoiceValue());
        BigDecimal newBudget = securityService.getCurrencyValueDecrypted(newPayment.getInvoiceValue());
        BigDecimal budgetChange = newBudget.subtract(oldBudget);
        return new PaymentOperation(LocalDateTime.now(), Long.valueOf(newPayment.getDatePayment().getMonthValue()),
            Long.valueOf(newPayment.getDatePayment().getYear()), securityService.encryptBigDecimal(budgetChange));
    }

}
