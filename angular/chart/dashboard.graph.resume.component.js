"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var dashboard_component_1 = require("../dashboard.component");
var graph_bar_anim_1 = require("../animations/graph.bar.anim");
var DELAY_GRAPH = 150;
var GraphData = /** @class */ (function () {
    function GraphData(container, dashboard) {
        this.container = container;
        this.dashboard = dashboard;
        this.size = 0;
        this.isTable = false;
        this.$dataGraph = [];
        this.makeGraphData();
    }
    Object.defineProperty(GraphData.prototype, "data", {
        get: function () {
            return this.dashboard.data.plannedXRealizedCostElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphData.prototype, "graph", {
        get: function () {
            return this.$dataGraph;
        },
        enumerable: true,
        configurable: true
    });
    GraphData.prototype.calculateSize = function () {
        var size = this.container.getBoundingClientRect().width;
        this.size = (size / this.graph.length) * 0.7;
    };
    GraphData.prototype.makeGraphData = function () {
        var graph = [];
        var data = this.dashboard.data.financialSummaryExpenseReportDTO;
        data.financialSummaryExpenseReportCostElementCategory.forEach(function (item) {
            var planned = 0;
            var realized = 0;
            var obj = {
                name: item.name,
                percentage: 0
            };
            var expenses = item.expenseReportCostElements;
            expenses.forEach(function (x) {
                planned += x.currentBudget;
                realized += x.realizedValues;
            });
            obj.percentage = Math.floor((realized / planned) * 100);
            graph.push(obj);
        });
        this.$dataGraph = graph;
    };
    return GraphData;
}());
var DashboardGraphResumeComponent = /** @class */ (function () {
    function DashboardGraphResumeComponent(elementRef, dashboardComponent) {
        this.elementRef = elementRef;
        this.dashboardComponent = dashboardComponent;
        this.graphData = null;
        this.isTable = true;
    }
    Object.defineProperty(DashboardGraphResumeComponent.prototype, "data", {
        get: function () {
            return [];
            //return this.dashboardComponent.data;
        },
        enumerable: true,
        configurable: true
    });
    DashboardGraphResumeComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            // let element : HTMLElement = this.elementRef.nativeElement;
            // let rect : ClientRect = element.getBoundingClientRect();
            // let graphSize = (rect.width / 4) * 0.7;
            // this.options = {
            //     donut: true,
            //     donutWidth: 15,
            //     showLabel : false,
            //     width: graphSize,
            //     height: graphSize
            // };
            // this.initialized = true;
            _this.graphData = new GraphData(_this.elementRef.nativeElement, _this.dashboardComponent);
            _this.refreshGraph();
        }, DELAY_GRAPH);
    };
    DashboardGraphResumeComponent.prototype.refreshGraph = function () {
        this.graphData.calculateSize();
    };
    tslib_1.__decorate([
        core_1.HostListener('window:resize'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], DashboardGraphResumeComponent.prototype, "refreshGraph", null);
    DashboardGraphResumeComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'dashboard-graph-resume',
            templateUrl: './dashboard.graph.resume.component.html',
            styleUrls: ['./dashboard.graph.resume.css'],
            encapsulation: core_1.ViewEncapsulation.None,
            animations: [
                graph_bar_anim_1.GraphResumeTrigger,
                graph_bar_anim_1.TableResumeTrigger
            ]
        }),
        tslib_1.__metadata("design:paramtypes", [core_1.ElementRef, dashboard_component_1.DashboardComponent])
    ], DashboardGraphResumeComponent);
    return DashboardGraphResumeComponent;
}());
exports.DashboardGraphResumeComponent = DashboardGraphResumeComponent;
//# sourceMappingURL=dashboard.graph.resume.component.js.map