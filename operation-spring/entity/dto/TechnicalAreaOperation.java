package com.prompt.operation.entity.dto;

import com.prompt.operation.core.dto.OperationDto;

import java.time.LocalDateTime;

public class TechnicalAreaOperation extends OperationDto {

    private String name;
    private Integer numberOfProjects;
    private byte[] totalPaid;
    private byte[] totalRealized;
    private byte[] totalBudget;

    /**
     *
     * @param occurredAt
     * @param name
     * @param numberOfProjects
     * @param totalPaid
     * @param totalRealized
     * @param totalBudget
     */
    public TechnicalAreaOperation(LocalDateTime occurredAt, String name, Integer numberOfProjects, byte[] totalPaid, byte[] totalRealized, byte[] totalBudget) {
        super(occurredAt);
        this.name = name;
        this.numberOfProjects = numberOfProjects;
        this.totalPaid = totalPaid;
        this.totalRealized = totalRealized;
        this.totalBudget = totalBudget;
    }

    public TechnicalAreaOperation() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getNumberOfProjects() {
        return numberOfProjects;
    }

    public void setNumberOfProjects(Integer numberOfProjects) {
        this.numberOfProjects = numberOfProjects;
    }

    public byte[] getTotalPaid() {
        return totalPaid;
    }

    public void setTotalPaid(byte[] totalPaid) {
        this.totalPaid = totalPaid;
    }

    public byte[] getTotalRealized() {
        return totalRealized;
    }

    public void setTotalRealized(byte[] totalRealized) {
        this.totalRealized = totalRealized;
    }

    public byte[] getTotalBudget() {
        return totalBudget;
    }

    public void setTotalBudget(byte[] totalBudget) {
        this.totalBudget = totalBudget;
    }
}
