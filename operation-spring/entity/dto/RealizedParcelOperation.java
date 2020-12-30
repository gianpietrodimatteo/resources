package com.prompt.operation.entity.dto;

import com.prompt.operation.core.dto.OperationDto;

import java.time.LocalDateTime;

public class RealizedParcelOperation extends OperationDto {

    private int month;
    private int year;
    private byte[] monthlySum;
    private boolean approved;

    public RealizedParcelOperation(LocalDateTime occurredAt, int month, int year, byte[] monthlySum, boolean approved) {
        super(occurredAt);
        this.month = month;
        this.year = year;
        this.monthlySum = monthlySum;
        this.approved = approved;
    }

    public RealizedParcelOperation() {
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public byte[] getMonthlySum() {
        return monthlySum;
    }

    public void setMonthlySum(byte[] monthlySum) {
        this.monthlySum = monthlySum;
    }

    public boolean isApproved() {
        return approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }
}
