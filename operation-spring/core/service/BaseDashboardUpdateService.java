package com.prompt.operation.core.service;

import com.prompt.operation.core.dto.OperationDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.*;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import java.util.*;

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

    public <O extends OperationDto>
    void sendOperation(String relativeUrl, O operationDto) {
        ResponseEntity<String> response = Objects.requireNonNull(sendOperationDto(relativeUrl, HttpMethod.POST, operationDto));
        if (acceptedCodes.contains(response.getStatusCode())) {
            logger.trace("Operation delivered! " + response.getStatusCode() + " " + operationDto);
        }
    }

    private <O extends OperationDto>
    ResponseEntity<String> sendOperationDto(String relativeUrl, HttpMethod method, O operationDto) throws ResourceAccessException {

        HttpHeaders headers = new HttpHeaders();
        headers.add("tenantid", "1");
        HttpEntity<OperationDto> request = new HttpEntity<>(operationDto, headers);

        final String url = baseUrl + "/" + relativeUrl;
        logger.trace("Sending " + method.toString() + " to " + url);

        return restTemplate.exchange(url, method, request, String.class);

    }

    private List<HttpStatus> stringListToStatusList(List<String> acceptedCodesNames) {
        List<HttpStatus> acceptedCodesList = new ArrayList<>();
        for (String codeName : acceptedCodesNames) {
            acceptedCodesList.add(HttpStatus.valueOf(codeName));
        }
        return acceptedCodesList;
    }
}
