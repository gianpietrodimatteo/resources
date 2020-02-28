import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'app/core';
import { LegalEntityService } from 'app/entities/legal-entity';
import { DashboardModel } from 'app/shared/model/dashboard.model';
import { ILegalEntity } from 'app/shared/model/legal-entity.model';
import { IProject } from 'app/shared/model/project.model';
import { JhiEventManager } from 'ng-jhipster';
import { ProjectComponent } from '../main/project.component';
import { DashboardService } from './dashboard.service';

export const ANIMATION_EVENT = 'OnAnimationEvent';

class GraphData {
    public size = 0;
    public calculateSize(): void {
        const size: number = this.container.getBoundingClientRect().width;
        this.size = size / 3 * 0.7;
    }
    constructor(private container: HTMLElement) { }
}

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit, OnDestroy {
    data: DashboardModel;
    executors: ILegalEntity[] = [];
    graphOffsetSize = 0;
    containerSize: string;
    secondContainerSize: string;
    graphData: GraphData = null;
    initialized = false;
    executorId = 0;
    isInternalUser: boolean;
    public loading = true;
    private constraints: any;
    private destroyed = false;
    private project: IProject;
    @ViewChild('graphContainer') private container: ElementRef;

    faRedo = faRedo;

    constructor(
        private parent: ProjectComponent,
        private eventManager: JhiEventManager,
        private service: DashboardService,
        private route: ActivatedRoute,
        private legalEntityService: LegalEntityService,
        private userService: UserService
    ) {
        this.constraints = parent.constraints;
        parent.constraints = { padding: 0, marginLeft: 0, marginRight: 0, marginTop: 0 };
    }

    ngOnInit() {
        this.userService.loggedUserIsInternal().subscribe(res => {
            this.isInternalUser = res.body;
        });

        this.onUpdate();
        this.onResize();
        this.route.parent.data.subscribe(({ project }) => {
            this.project = project;
            this.loadExecutors();
        });
        setTimeout(() => {
            this.graphData = new GraphData(this.container.nativeElement);
            this.onResize();
        }, 150);
    }
    ngOnDestroy() {
        this.destroyed = true;
        this.parent.constraints = this.constraints;
    }
    onChange() {
        this.loadData();
    }
    /// This method is used for send animation events into nested components
    private onUpdate() {
        if (!this.destroyed) {
            requestAnimationFrame(() => {
                this.onUpdate();
                this.eventManager.broadcast({
                    name: ANIMATION_EVENT
                });
            });
        }
    }
    @HostListener('window:resize')
    private onResize(): void {
        setTimeout(() => {
            this.containerSize = this.getContainerSize(0);
            this.secondContainerSize = this.getContainerSize(1);

            if (this.graphData) {
                this.graphData.calculateSize();
            }
        }, 0);
    }
    private getContainerSize(offset: number): string {
        let height = window.innerHeight;
        const elements = document.getElementsByClassName('calc-nav');
        for (let i = 0; i < elements.length - offset; i++) {
            height -= elements[i].getBoundingClientRect().height;
        }

        return height + 'px';
    }
    private loadData() {
        this.loading = true;
        this.service.fetch(this.project.id, this.executorId).subscribe(x => {
            this.data = new DashboardModel(x);
            this.loading = false;
        });
    }
    private loadExecutors() {
        this.legalEntityService.findExecutorsForUserByProjecId(this.project.id).subscribe(result => {
            this.executors = result.body;
            if (!this.isInternalUser) {
                this.executorId = this.executors[0].id;
            }
            this.loadData();
        });
    }
}
