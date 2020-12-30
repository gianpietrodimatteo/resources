package com.prompt.operation.core.dto;

import java.time.LocalDateTime;

public class OperationDto {

    private LocalDateTime occurredAt;

    public OperationDto() {
    }

    public OperationDto(LocalDateTime occurredAt) {
        this.occurredAt = occurredAt;
    }

    public LocalDateTime getOccurredAt() {
        return occurredAt;
    }
}
