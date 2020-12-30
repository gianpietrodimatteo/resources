package com.prompt.operation.core.dto;

public class DashboardResetRequest {

    private boolean costElement;
    private boolean expectedParcel;
    private boolean payment;
    private boolean realizedParcel;
    private boolean technicalArea;

    public DashboardResetRequest(boolean costElement, boolean expectedParcel, boolean payment, boolean realizedParcel, boolean technicalArea) {
        this.costElement = costElement;
        this.expectedParcel = expectedParcel;
        this.payment = payment;
        this.realizedParcel = realizedParcel;
        this.technicalArea = technicalArea;
    }

    public DashboardResetRequest() {
    }

    public boolean isCostElement() {
        return costElement;
    }

    public void setCostElement(boolean costElement) {
        this.costElement = costElement;
    }

    public boolean isExpectedParcel() {
        return expectedParcel;
    }

    public void setExpectedParcel(boolean expectedParcel) {
        this.expectedParcel = expectedParcel;
    }

    public boolean isPayment() {
        return payment;
    }

    public void setPayment(boolean payment) {
        this.payment = payment;
    }

    public boolean isRealizedParcel() {
        return realizedParcel;
    }

    public void setRealizedParcel(boolean realizedParcel) {
        this.realizedParcel = realizedParcel;
    }

    public boolean isTechnicalArea() {
        return technicalArea;
    }

    public void setTechnicalArea(boolean technicalArea) {
        this.technicalArea = technicalArea;
    }
}
