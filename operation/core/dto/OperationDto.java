package com.prompt.operation.core.dto;

import com.prompt.operation.core.domain.Operation;

import java.time.LocalDateTime;

public class OperationDto {

    private String uuid;
    private LocalDateTime occurredAt;

    public OperationDto() {
    }

    public OperationDto(String uuid, LocalDateTime occurredAt) {
        this.uuid = uuid;
        this.occurredAt = occurredAt;
    }

    public OperationDto(Operation operation) {
        this.uuid = operation.getUuid();
        this.occurredAt = operation.getOccurredAt();
    }

    public String getUuid() {
        return uuid;
    }

    public LocalDateTime getOccurredAt() {
        return occurredAt;
    }
}
