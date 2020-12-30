package com.prompt.operation;

import com.prompt.operation.core.dto.DashboardResetDto;
import com.prompt.operation.core.dto.DashboardResetRequest;
import com.prompt.operation.entity.dto.*;
import com.prompt.repository.*;
import com.prompt.service.SecurityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class WalletDashboardResource {

    @Autowired
    private TechnicalAreaRepository technicalAreaRepository;
    @Autowired
    private ExpenseRepository expenseRepository;
    @Autowired
    private DisbursementParcelRepository disbursementParcelRepository;
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private CostElementRepository costElementRepository;

    @Autowired
    private SecurityService securityService;

    private static final Logger logger = LoggerFactory.getLogger(WalletDashboardResource.class);

    @PostMapping("/wallet-dashboard/reset")
    public ResponseEntity<DashboardResetDto> createTeamMemberRole(@RequestBody final DashboardResetRequest dashboardResetRequest) {
        logger.debug("REST request to resend initial dashboard values ", dashboardResetRequest);

        List<TechnicalAreaOperation> technicalAreaOperations = new ArrayList<>();
        List<CostElementOperation> costElementOperations = new ArrayList<>();
        List<ExpectedParcelOperation> expectedParcelOperations = new ArrayList<>();
        List<RealizedParcelOperation> realizedParcelOperations = new ArrayList<>();
        List<PaymentOperation> paymentOperations = new ArrayList<>();

        if (dashboardResetRequest.isTechnicalArea()) {
            technicalAreaRepository.getWalletDashboardInitialValues(securityService.readKey()).forEach(tad -> {
                technicalAreaOperations.add(new TechnicalAreaOperation(
                    null, tad.getName(), tad.getNumberOfProjects(), tad.getTotalPaid(), tad.getTotalRealized(), tad.getTotalBudget()
                ));
            });
        }
        if (dashboardResetRequest.isCostElement()) {
            costElementRepository.getWalletDashboardInitialValues(securityService.readKey()).forEach(ced -> {
                costElementOperations.add(new CostElementOperation(
                    null, ced.getName(), ced.getSymbol(), ced.getTotalBudget()
                ));
            });
        }
        if (dashboardResetRequest.isExpectedParcel()) {
            disbursementParcelRepository.getWalletDashboardInitialValues(securityService.readKey()).forEach(epd -> {
                expectedParcelOperations.add(new ExpectedParcelOperation(
                    null, epd.getMonth(), epd.getYear(), epd.getMonthlySum()
                ));
            });
        }
        if (dashboardResetRequest.isPayment()) {
            paymentRepository.getWalletDashboardInitialValues(securityService.readKey()).forEach(pd -> {
                paymentOperations.add(new PaymentOperation(
                    null, pd.getMonth(), pd.getYear(), pd.getMonthlySum()
                ));
            });
        }
        if (dashboardResetRequest.isRealizedParcel()) {
            expenseRepository.getWalletDashboardInitialValues(securityService.readKey()).forEach(rpd -> {
                realizedParcelOperations.add(new RealizedParcelOperation(
                    null, rpd.getMonth(), rpd.getYear(), rpd.getMonthlySum(), rpd.isApproved()
                ));
            });
        }

        DashboardResetDto dashboardResetDto = new DashboardResetDto(
            costElementOperations,
            expectedParcelOperations,
            paymentOperations,
            realizedParcelOperations,
            technicalAreaOperations
        );

        return ResponseEntity.ok(dashboardResetDto);
    }
}
