package com.prompt.operation.core.service;

import com.prompt.operation.core.domain.Operation;
import com.prompt.operation.core.dto.OperationDto;
import com.prompt.operation.core.event.DashboardStatusEvent;
import com.prompt.operation.core.repository.OperationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ExecutionException;

public abstract class BaseDashboardUpdateService {

    private static final Logger logger = LoggerFactory.getLogger(BaseDashboardUpdateService.class);
    protected final ApplicationEventPublisher applicationEventPublisher;
    protected final Set<HttpStatus> acceptedCodes = new HashSet<>(Arrays.asList(HttpStatus.CREATED, HttpStatus.CONFLICT, HttpStatus.INTERNAL_SERVER_ERROR));
    private final RestTemplate restTemplate;
    @Value("${dashboard.url}")
    private String baseUrl;

    protected BaseDashboardUpdateService(
        RestTemplateBuilder restTemplateBuilder,
        ApplicationEventPublisher applicationEventPublisher
    ) {
        this.restTemplate = restTemplateBuilder.build();
        this.applicationEventPublisher = applicationEventPublisher;
    }

    public <O extends Operation,
        D extends OperationDto,
        R extends OperationRepository<O>>
    void sendOperation(String relativeUrl, O operation, D operationDto, R repository) throws ExecutionException, InterruptedException {
        try {
            ResponseEntity<String> response = Objects.requireNonNull(sendOperationDto(relativeUrl, HttpMethod.POST, operationDto));
            if (acceptedCodes.contains(response.getStatusCode())) {
                operation.received(LocalDateTime.now());
                repository.save(operation);
                logger.trace("Operation delivered! " + response.getStatusCode() + " " + operation);
            }
        } catch (ResourceAccessException e) {
            logger.warn("The dashboard server is down!");
            applicationEventPublisher.publishEvent(new DashboardStatusEvent(false));
        } catch (HttpClientErrorException e) {
            operation.received(LocalDateTime.now());
            repository.save(operation);
            logger.trace("Operation delivered! " + e.getMessage());
        }
    }

    public void checkDashboardStatus() throws ExecutionException, InterruptedException {
        try {
            ResponseEntity<String> response = Objects.requireNonNull(sendOperationDto("status", HttpMethod.GET, null));
            if (!response.getStatusCode().equals(HttpStatus.NOT_FOUND)) {
                logger.debug("The dashboard server is up.");
                applicationEventPublisher.publishEvent(new DashboardStatusEvent(true));
            }
        } catch (ResourceAccessException e) {
            logger.warn("The dashboard server is down.");
        }
    }

    private <D extends OperationDto>
    ResponseEntity<String> sendOperationDto(String relativeUrl, HttpMethod method, D operationDto) throws ResourceAccessException {

        HttpHeaders headers = new HttpHeaders();
        headers.add("tenantid", "1");
        HttpEntity<OperationDto> request = new HttpEntity<>(operationDto, headers);

        final String url = baseUrl + "/" + relativeUrl;
        logger.trace("Sending " + method.toString() + " to " + url);

        return restTemplate.exchange(url, method, request, String.class);

//        switch (method) {
//            case GET:
//                return CompletableFuture.completedFuture(restTemplate.getForEntity(url, String.class, map));
//            case POST:
//                return CompletableFuture.completedFuture(restTemplate.postForEntity(url, request, String.class));
//            default:
//                logger.error("No other method for this service implemented for the dashboard service!");
//                return null;
//        }
    }

    private List<HttpStatus> stringListToStatusList(List<String> acceptedCodesNames) {
        List<HttpStatus> acceptedCodesList = new ArrayList<>();
        for (String codeName : acceptedCodesNames) {
            acceptedCodesList.add(HttpStatus.valueOf(codeName));
        }
        return acceptedCodesList;
    }
}
