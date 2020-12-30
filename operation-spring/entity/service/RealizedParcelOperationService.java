package com.prompt.operation.entity.service;

import com.prompt.entity.Expense;
import com.prompt.entity.ExpenseReport;
import com.prompt.entity.ExpenseReportState;
import com.prompt.operation.core.service.OperationService;
import com.prompt.operation.entity.dto.RealizedParcelOperation;
import com.prompt.service.SecurityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Service
public class RealizedParcelOperationService extends OperationService<RealizedParcelOperation, Expense> {
    private final static Logger logger = LoggerFactory.getLogger(RealizedParcelOperationService.class);
    private final ApplicationEventPublisher applicationEventPublisher;

    @Autowired
    private SecurityService securityService;

    public RealizedParcelOperationService(ApplicationEventPublisher applicationEventPublisher) {
        this.applicationEventPublisher = applicationEventPublisher;
    }


//    public RealizedParcelOperation(LocalDateTime occurredAt, Long month, Long year, byte[] monthlySum, boolean approved) {

    public Set<RealizedParcelOperation> buildOperationsFromReport(ExpenseReport expenseReport) {
        Set<RealizedParcelOperation> realizedParcelOperations = new HashSet<>();
        final RealizedParcelOperation[] iteratorOperation = new RealizedParcelOperation[1];
        final boolean[] isNewEntry = {true};
        expenseReport.getExpenses().forEach(expense -> {
            realizedParcelOperations.forEach(realizedParcelOperation -> {
                if (realizedParcelOperation.getMonth() == expense.getDate().getMonthValue() &&
                    realizedParcelOperation.getYear() == expense.getDate().getYear()) {
                    realizedParcelOperation.setMonthlySum(securityService.addCurrencyValue(realizedParcelOperation.getMonthlySum(), expense.getTotalValue()));
                    isNewEntry[0] = false;
                }
            });
            if (isNewEntry[0]) {
                iteratorOperation[0] = new RealizedParcelOperation(
                    LocalDateTime.now(),
                    expense.getDate().getMonthValue(),
                    expense.getDate().getYear(),
                    expense.getTotalValue(),
                    expenseReport.isApproved());
                realizedParcelOperations.add(iteratorOperation[0]);
            }
            isNewEntry[0] = true;
        });
        return realizedParcelOperations;
    }
// talvez fazer expe4nse por expense mesmo e priu
//    public Set<RealizedParcelOperation> negateOperations

    public RealizedParcelOperation createOperation(Expense expense) {
        return new RealizedParcelOperation(
            LocalDateTime.now(),
            expense.getDate().getMonthValue(),
            expense.getDate().getYear(),
            expense.getTotalValue(),
            expense.getExpenseReport().getExpenseReportState().equals(ExpenseReportState.QUITTED) ||
                expense.getExpenseReport().getExpenseReportState().equals(ExpenseReportState.APPROVED_WITH_DOCUMENTS_PENDING)
        );
    }

    public RealizedParcelOperation deleteOperation(Expense expense) {
        return new RealizedParcelOperation(
            LocalDateTime.now(),
            expense.getDate().getMonthValue(),
            expense.getDate().getYear(),
            securityService.negateCurrencyValue(expense.getTotalValue()),
            expense.getExpenseReport().getExpenseReportState().equals(ExpenseReportState.QUITTED) ||
                expense.getExpenseReport().getExpenseReportState().equals(ExpenseReportState.APPROVED_WITH_DOCUMENTS_PENDING));
    }

    public RealizedParcelOperation updateOperation(Expense oldExpense, Expense newExpense) {
        return new RealizedParcelOperation(
            LocalDateTime.now(),
            newExpense.getDate().getMonthValue(),
            newExpense.getDate().getYear(),
            securityService.subtractCurrencyValue(newExpense.getTotalValue(), oldExpense.getTotalValue()),
            newExpense.getExpenseReport().getExpenseReportState().equals(ExpenseReportState.QUITTED) ||
                newExpense.getExpenseReport().getExpenseReportState().equals(ExpenseReportState.APPROVED_WITH_DOCUMENTS_PENDING));
    }

}
