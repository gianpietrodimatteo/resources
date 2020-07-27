package com.prompt.operation.core.domain;

import com.prompt.operation.core.enums.Status;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.UUID;

@MappedSuperclass
public class Operation {
    private final String uuid = UUID.randomUUID().toString();
    private final LocalDateTime occurredAt = LocalDateTime.now();
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime receivedAt;
    private Status status = Status.PENDING;

    public void received(LocalDateTime at) {
        this.receivedAt = at;
        this.status = Status.RECEIVED;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getReceivedAt() {
        return receivedAt;
    }

    @NotNull
    public Status getStatus() {
        return status;
    }

    @NotNull
    public String getUuid() {
        return uuid;
    }

    @NotNull
    public LocalDateTime getOccurredAt() {
        return occurredAt;
    }

}
