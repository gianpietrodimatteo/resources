package com.prompt.operation.entity.dto;

import com.prompt.operation.core.dto.OperationDto;

import java.time.LocalDateTime;

public class ExpectedParcelOperation extends OperationDto {

    private Long month;
    private Long year;
    private byte[] monthlySum;

    public ExpectedParcelOperation(LocalDateTime occurredAt, Long month, Long year, byte[] monthlySum) {
        super(occurredAt);
        this.month = month;
        this.year = year;
        this.monthlySum = monthlySum;
    }

    public ExpectedParcelOperation() {
    }

    public Long getMonth() {
        return month;
    }

    public void setMonth(Long month) {
        this.month = month;
    }

    public Long getYear() {
        return year;
    }

    public void setYear(Long year) {
        this.year = year;
    }

    public byte[] getMonthlySum() {
        return monthlySum;
    }

    public void setMonthlySum(byte[] monthlySum) {
        this.monthlySum = monthlySum;
    }
}
