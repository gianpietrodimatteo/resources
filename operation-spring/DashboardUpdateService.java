package com.prompt.operation;

import com.prompt.operation.core.service.BaseDashboardUpdateService;
import com.prompt.operation.entity.dto.CostElementOperation;
import com.prompt.operation.entity.dto.PaymentOperation;
import com.prompt.operation.entity.dto.RealizedParcelOperation;
import com.prompt.operation.entity.dto.TechnicalAreaOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class DashboardUpdateService extends BaseDashboardUpdateService {

    private static final Logger logger = LoggerFactory.getLogger(DashboardUpdateService.class);

    protected DashboardUpdateService(RestTemplateBuilder restTemplateBuilder, ApplicationEventPublisher applicationEventPublisher) {
        super(restTemplateBuilder, applicationEventPublisher);
    }

    public void sendCostElementOperation(CostElementOperation operation) throws ExecutionException, InterruptedException {
        sendOperation("cost-element", operation);
    }

    public void sendTechnicalAreaOperation(TechnicalAreaOperation operation) throws ExecutionException, InterruptedException {
        sendOperation("technical-area", operation);
    }

    public void sendPaymentOperation(PaymentOperation operation) throws ExecutionException, InterruptedException {
        sendOperation("payment", operation);
    }

    public void sendRealizedParcelOperation(RealizedParcelOperation operation) throws ExecutionException, InterruptedException {
        sendOperation("realized-parcel", operation);
    }

}
