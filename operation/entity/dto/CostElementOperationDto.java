package com.prompt.operation.entity.dto;

import com.prompt.operation.core.dto.OperationDto;
import com.prompt.operation.entity.domain.CostElementOperation;

import java.time.LocalDateTime;

public class CostElementOperationDto extends OperationDto {

    private String name;

    private String symbol;

    private byte[] budgetChange;

    public CostElementOperationDto() {
    }

    public CostElementOperationDto(String uuid, LocalDateTime occurredAt, String name, String symbol, byte[] budgetChange) {
        super(uuid, occurredAt);
        this.name = name;
        this.symbol = symbol;
        this.budgetChange = budgetChange;
    }

    public CostElementOperationDto(CostElementOperation operation) {
        super(operation);
        this.name = operation.getName();
        this.symbol = operation.getSymbol();
        this.budgetChange = operation.getBudgetChange();
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

    public byte[] getBudgetChange() {
        return budgetChange;
    }

    public void setBudgetChange(byte[] budgetChange) {
        this.budgetChange = budgetChange;
    }
}
