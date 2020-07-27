package com.prompt.operation.entity.domain;

import com.prompt.operation.core.domain.Operation;

import javax.persistence.Entity;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
public class CostElementOperation extends Operation implements Serializable {

    private static final long serialVersionUID = 1L;

    private String name;

    private String symbol;

    private byte[] budgetChange;

    public CostElementOperation() {
    }

    public CostElementOperation(String name, String symbol, byte[] budgetChange) {
        super();
        this.name = name;
        this.symbol = symbol;
        this.budgetChange = budgetChange;
    }

    @NotNull
    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    @NotNull
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @NotNull
    public byte[] getBudgetChange() {
        return budgetChange;
    }

    public void setBudgetChange(byte[] budgetChange) {
        this.budgetChange = budgetChange;
    }
}
