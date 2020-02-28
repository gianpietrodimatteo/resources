"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var project_component_1 = require("../main/project.component");
var ng_jhipster_1 = require("ng-jhipster");
var dashboard_model_1 = require("app/shared/model/dashboard.model");
var dashboard_service_1 = require("./dashboard.service");
var router_1 = require("@angular/router");
var legal_entity_1 = require("app/entities/legal-entity");
exports.ANIMATION_EVENT = 'OnAnimationEvent';
var core_2 = require("app/core");
var GraphData = /** @class */ (function () {
    function GraphData(container) {
        this.container = container;
        this.size = 0;
    }
    GraphData.prototype.calculateSize = function () {
        var size = this.container.getBoundingClientRect().width;
        this.size = size / 3 * 0.7;
    };
    return GraphData;
}());
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(parent, eventManager, service, route, legalEntityService, userService) {
        this.parent = parent;
        this.eventManager = eventManager;
        this.service = service;
        this.route = route;
        this.legalEntityService = legalEntityService;
        this.userService = userService;
        this.data = new dashboard_model_1.DashboardModel();
        this.executors = [];
        this.graphOffsetSize = 0;
        this.graphData = null;
        this.initialized = false;
        this.executorId = 0;
        this.loading = true;
        this.destroyed = false;
        this.constraints = parent.constraints;
        parent.constraints = { padding: 0, marginLeft: 0, marginRight: 0, marginTop: 0 };
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.loggedUserIsInternal().subscribe(function (res) {
            _this.isInternalUser = res.body;
        });
        this.onUpdate();
        this.onResize();
        this.route.parent.data.subscribe(function (_a) {
            var project = _a.project;
            _this.project = project;
            _this.loadExecutors();
        });
        setTimeout(function () {
            _this.graphData = new GraphData(_this.container.nativeElement);
            _this.onResize();
        }, 150);
    };
    DashboardComponent.prototype.ngOnDestroy = function () {
        this.destroyed = true;
        this.parent.constraints = this.constraints;
    };
    DashboardComponent.prototype.onChange = function () {
        this.loadData();
    };
    /// This method is used for send animation events into nested components
    DashboardComponent.prototype.onUpdate = function () {
        var _this = this;
        if (!this.destroyed) {
            requestAnimationFrame(function () {
                _this.onUpdate();
                _this.eventManager.broadcast({
                    name: exports.ANIMATION_EVENT
                });
            });
        }
    };
    DashboardComponent.prototype.onResize = function () {
        var _this = this;
        setTimeout(function () {
            _this.containerSize = _this.getContainerSize(0);
            _this.secondContainerSize = _this.getContainerSize(1);
            if (_this.graphData) {
                _this.graphData.calculateSize();
            }
        }, 0);
    };
    DashboardComponent.prototype.getContainerSize = function (offset) {
        var height = window.innerHeight;
        var elements = document.getElementsByClassName('calc-nav');
        for (var i = 0; i < elements.length - offset; i++) {
            height -= elements[i].getBoundingClientRect().height;
        }
        return height + 'px';
    };
    DashboardComponent.prototype.loadData = function () {
        var _this = this;
        this.loading = true;
        this.service.fetch(this.project.id, this.executorId).subscribe(function (x) {
            console.log(x);
            _this.loading = false;
            _this.data = x;
        });
    };
    DashboardComponent.prototype.loadExecutors = function () {
        var _this = this;
        this.legalEntityService.findExecutorsForUserByProjecId(this.project.id).subscribe(function (result) {
            _this.executors = result.body;
            if (!_this.isInternalUser) {
                _this.executorId = _this.executors[0].id;
            }
            _this.loadData();
        });
    };
    tslib_1.__decorate([
        core_1.ViewChild('graphContainer'),
        tslib_1.__metadata("design:type", core_1.ElementRef)
    ], DashboardComponent.prototype, "container", void 0);
    tslib_1.__decorate([
        core_1.HostListener('window:resize'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], DashboardComponent.prototype, "onResize", null);
    DashboardComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        tslib_1.__metadata("design:paramtypes", [project_component_1.ProjectComponent,
            ng_jhipster_1.JhiEventManager,
            dashboard_service_1.DashboardService,
            router_1.ActivatedRoute,
            legal_entity_1.LegalEntityService,
            core_2.UserService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map