"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var dashboard_component_1 = require("../dashboard.component");
var tab_anim_1 = require("../animations/tab.anim");
var graph_bar_anim_1 = require("../animations/graph.bar.anim");
var ANIMATIONS = [graph_bar_anim_1.GraphTrigger, tab_anim_1.LegendTrigger, tab_anim_1.DetailsTrigger, tab_anim_1.ShowContainerTrigger];
var DashboardGraphComponent = /** @class */ (function () {
    function DashboardGraphComponent(dashboard) {
        this.dashboard = dashboard;
        this.state = false;
        this.offsetBar = 0;
        this.currentValue = 0;
        this.tempValue = 0;
        this.math = Math;
        this.legends = false;
        this.occluded = true;
        this.animBars = false;
    }
    Object.defineProperty(DashboardGraphComponent.prototype, "total", {
        get: function () {
            return this.dashboard.data.totalPlanned;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DashboardGraphComponent.prototype, "data", {
        get: function () {
            return this.dashboard.data.plannedXRealizedCostElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DashboardGraphComponent.prototype, "loading", {
        get: function () {
            return this.dashboard.loading;
        },
        enumerable: true,
        configurable: true
    });
    DashboardGraphComponent.prototype.onFinishGraphAnim = function () {
        this.animBars = true;
    };
    DashboardGraphComponent.prototype.getBarHeight = function (value, max) {
        return Math.clamp(value / max * 20, 0, 20);
    };
    DashboardGraphComponent.prototype.onScroll = function () {
        if (this.isOccluded(this.element.nativeElement)) {
            return;
        }
        this.occluded = false;
    };
    DashboardGraphComponent.prototype.isOccluded = function (element) {
        var rect = element.getBoundingClientRect();
        var elementTop = element.offsetTop;
        var elementBottom = elementTop + rect.height;
        var viewportTop = window.scrollY;
        var viewportBottom = viewportTop + window.innerHeight;
        return !(elementBottom > viewportTop && elementTop < viewportBottom);
    };
    tslib_1.__decorate([
        core_1.ViewChild('container'),
        tslib_1.__metadata("design:type", core_1.ElementRef)
    ], DashboardGraphComponent.prototype, "element", void 0);
    tslib_1.__decorate([
        core_1.HostListener('window:scroll'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], DashboardGraphComponent.prototype, "onScroll", null);
    DashboardGraphComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'dashboard-graph',
            templateUrl: 'dashboard.graph.component.html',
            styleUrls: ['./dashboard.graph.component.css'],
            animations: ANIMATIONS
        }),
        tslib_1.__metadata("design:paramtypes", [dashboard_component_1.DashboardComponent])
    ], DashboardGraphComponent);
    return DashboardGraphComponent;
}());
exports.DashboardGraphComponent = DashboardGraphComponent;
//# sourceMappingURL=dashboard.graph.component.js.map