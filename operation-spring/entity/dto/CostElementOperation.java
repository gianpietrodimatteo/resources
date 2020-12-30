package com.prompt.operation.entity.dto;

import com.prompt.operation.core.dto.OperationDto;

import java.time.LocalDateTime;

public class CostElementOperation extends OperationDto {

    private String name;

    private String symbol;

    private byte[] totalBudget;

    public CostElementOperation() {
    }

    public CostElementOperation(LocalDateTime occurredAt, String name, String symbol, byte[] totalBudget) {
        super(occurredAt);
        this.name = name;
        this.symbol = symbol;
        this.totalBudget = totalBudget;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getTotalBudget() {
        return totalBudget;
    }

    public void setTotalBudget(byte[] totalBudget) {
        this.totalBudget = totalBudget;
    }
}
