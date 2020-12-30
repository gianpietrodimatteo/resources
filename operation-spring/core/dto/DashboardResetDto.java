package com.prompt.operation.core.dto;

import com.prompt.operation.entity.dto.*;

import java.util.List;

public class DashboardResetDto {

    private List<CostElementOperation> costElementOperations;
    private List<ExpectedParcelOperation> expectedParcelOperations;
    private List<PaymentOperation> paymentOperations;
    private List<RealizedParcelOperation> realizedParcelOperations;
    private List<TechnicalAreaOperation> technicalAreaOperations;

    public DashboardResetDto(
        List<CostElementOperation> costElementOperations,
        List<ExpectedParcelOperation> expectedParcelOperations,
        List<PaymentOperation> paymentOperations,
        List<RealizedParcelOperation> realizedParcelOperations,
        List<TechnicalAreaOperation> technicalAreaOperations
    ) {
        this.costElementOperations = costElementOperations;
        this.expectedParcelOperations = expectedParcelOperations;
        this.paymentOperations = paymentOperations;
        this.realizedParcelOperations = realizedParcelOperations;
        this.technicalAreaOperations = technicalAreaOperations;
    }

    public DashboardResetDto() {
    }

    public List<CostElementOperation> getCostElementOperations() {
        return costElementOperations;
    }

    public void setCostElementOperations(List<CostElementOperation> costElementOperations) {
        this.costElementOperations = costElementOperations;
    }

    public List<ExpectedParcelOperation> getExpectedParcelOperations() {
        return expectedParcelOperations;
    }

    public void setExpectedParcelOperations(List<ExpectedParcelOperation> expectedParcelOperations) {
        this.expectedParcelOperations = expectedParcelOperations;
    }

    public List<PaymentOperation> getPaymentOperations() {
        return paymentOperations;
    }

    public void setPaymentOperations(List<PaymentOperation> paymentOperations) {
        this.paymentOperations = paymentOperations;
    }

    public List<RealizedParcelOperation> getRealizedParcelOperations() {
        return realizedParcelOperations;
    }

    public void setRealizedParcelOperations(List<RealizedParcelOperation> realizedParcelOperations) {
        this.realizedParcelOperations = realizedParcelOperations;
    }

    public List<TechnicalAreaOperation> getTechnicalAreaOperations() {
        return technicalAreaOperations;
    }

    public void setTechnicalAreaOperations(List<TechnicalAreaOperation> technicalAreaOperations) {
        this.technicalAreaOperations = technicalAreaOperations;
    }
}
