package com.prompt.operation.entity.repository;

import com.prompt.operation.core.enums.Status;
import com.prompt.operation.core.repository.OperationRepository;
import com.prompt.operation.entity.domain.CostElementOperation;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CostElementOperationRepository extends OperationRepository<CostElementOperation> {

    @Override
    List<CostElementOperation> findByStatus(Status status, Pageable pageable);

}
