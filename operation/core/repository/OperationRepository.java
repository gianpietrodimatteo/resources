package com.prompt.operation.core.repository;

import com.prompt.operation.core.enums.Status;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OperationRepository<O> extends JpaRepository<O, Long> {

    List<O> findByStatus(Status status, Pageable pageable);

}
