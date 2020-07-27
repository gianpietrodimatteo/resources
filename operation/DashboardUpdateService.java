package com.prompt.operation;

import com.prompt.operation.core.service.BaseDashboardUpdateService;
import com.prompt.operation.entity.domain.CostElementOperation;
import com.prompt.operation.entity.dto.CostElementOperationDto;
import com.prompt.operation.entity.repository.CostElementOperationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class DashboardUpdateService extends BaseDashboardUpdateService {
    private static final Logger logger = LoggerFactory.getLogger(DashboardUpdateService.class);

    @Autowired
    private CostElementOperationRepository costElementOperationRepository;

    protected DashboardUpdateService(RestTemplateBuilder restTemplateBuilder, ApplicationEventPublisher applicationEventPublisher) {
        super(restTemplateBuilder, applicationEventPublisher);
    }

    public void sendCostElementOperation(CostElementOperation operation) throws ExecutionException, InterruptedException {
        sendOperation("cost-element", operation, new CostElementOperationDto(operation), costElementOperationRepository);
    }

}
