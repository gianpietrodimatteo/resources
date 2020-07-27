package com.prompt.operation.core.event;

public class DashboardStatusEvent {
    private boolean walletDashboardUp;

    public DashboardStatusEvent() {
    }

    public DashboardStatusEvent(boolean walletDashboardUp) {
        this.walletDashboardUp = walletDashboardUp;
    }

    public boolean isWalletDashboardUp() {
        return walletDashboardUp;
    }

    public void setWalletDashboardUp(boolean walletDashboardUp) {
        this.walletDashboardUp = walletDashboardUp;
    }
}
