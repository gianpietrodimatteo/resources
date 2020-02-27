import { Component, ViewEncapsulation, OnInit, ElementRef, ViewChild, HostListener } from "@angular/core";
import { DashboardComponent } from '../dashboard.component';
import { GraphResumeTrigger, TableResumeTrigger } from '../animations/graph.bar.anim';
const DELAY_GRAPH = 150;
class GraphData{
    public size : number = 0;
    public isTable : boolean = false;

    private $dataGraph : any[] = [];
    public get data() : any[]{
        return this.dashboard.data.plannedXRealizedCostElement;
    }
    public get graph() : any[]{
        return this.$dataGraph;
    }
    public calculateSize() : void{
        let size : number = this.container.getBoundingClientRect().width;
        this.size = (size / this.graph.length) * 0.7;
    }
    constructor(private container : HTMLElement, private dashboard : DashboardComponent){
        this.makeGraphData();
    }
    private makeGraphData() : void{
        let graph = [];
        let data = this.dashboard.data.financialSummaryExpenseReportDTO;
        data.financialSummaryExpenseReportCostElementCategory.forEach(item =>{
            let planned     = 0;
            let realized    = 0;
            let obj = {
                name : item.name,
                percentage : 0
            };
            let expenses = item.expenseReportCostElements;
            expenses.forEach(x => {
                planned += x.currentBudget;
                realized += x.realizedValues;
            });
            obj.percentage = Math.floor((realized / planned) * 100);
            graph.push(obj);
        });

        this.$dataGraph = graph;
    }
}
@Component({
    selector: 'dashboard-graph-resume',
    templateUrl: './dashboard.graph.resume.component.html',
    styleUrls: ['./dashboard.graph.resume.css'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        GraphResumeTrigger,
        TableResumeTrigger
    ]
})
export class DashboardGraphResumeComponent implements OnInit{
    graphData : GraphData = null;
    isTable : boolean = true;
    public get data() : any[]{
        return [];
        //return this.dashboardComponent.data;
    }
    constructor(private elementRef : ElementRef, private dashboardComponent : DashboardComponent){
    }
    ngOnInit(): void {
        setTimeout(()=>{
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
            this.graphData = new GraphData(this.elementRef.nativeElement, this.dashboardComponent);
            this.refreshGraph();
        }, DELAY_GRAPH);
    }
    @HostListener('window:resize')
    refreshGraph(){
        this.graphData.calculateSize();
    }
}