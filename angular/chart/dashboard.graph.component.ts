import { CurrencyPipe } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { GraphTrigger } from '../animations/graph.bar.anim';
import { DetailsTrigger, LegendTrigger, ShowContainerTrigger } from '../animations/tab.anim';
import { DashboardComponent } from '../dashboard.component';

const ANIMATIONS = [GraphTrigger, LegendTrigger, DetailsTrigger, ShowContainerTrigger];
@Component({
    selector: 'dashboard-graph',
    templateUrl: 'dashboard.graph.component.html',
    styleUrls: ['./dashboard.graph.component.css'],
    animations: ANIMATIONS
})
export class DashboardGraphComponent {
    barChartFontSize = 16;
    barChartGridLineOpacity = 0.2;
    public barChartOptions: ChartOptions;
    public barChartLabels = [];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;
    public barChartPlugins = [pluginDataLabels];

    public barChartData: ChartDataSets[] = [{}];

    barChartOpacity = 0.8;
    public barChartColors: Array<any> = [
        { // 1st set, total planned
            backgroundColor: `rgba(225,10,24,${this.barChartOpacity})`,
            borderColor: `rgba(225,10,24,${this.barChartOpacity})`,
            pointBackgroundColor: `rgba(225,10,24,${this.barChartOpacity})`,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: `rgba(225,10,24,${this.barChartOpacity})`
        },
        { // 2nd set, total realized
            backgroundColor: `rgba(0, 0, 255,${this.barChartOpacity})`,
            borderColor: `rgba(0, 0, 255,${this.barChartOpacity})`,
            pointBackgroundColor: `rgba(0, 0, 255,${this.barChartOpacity})`,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: `rgba(0, 0, 255,${this.barChartOpacity})`
        }
    ];

    public legends = false;
    public occluded = true;

    private readonly data: any[];

    @ViewChild('container') private element: ElementRef;

    constructor(private dashboard: DashboardComponent, private currencyPipe: CurrencyPipe) {
        this.data = this.dashboard.data.plannedXRealizedCostElement;
        this.barChartOptions = {
            responsive: true,
            scales: {
                xAxes: [{
                    ticks: { fontColor: 'white', fontSize: this.barChartFontSize },
                    gridLines: { color: `rgba(255,255,255,${this.barChartGridLineOpacity})` }
                }],
                yAxes: [{
                    ticks: {
                        fontColor: 'white', fontSize: this.barChartFontSize,
                        callback: label => `R$${this.adjustCurrency(label)}`
                    },
                    gridLines: { color: `rgba(255,255,255,${this.barChartGridLineOpacity})` }
                }]
            },
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'end',
                    color: 'white',
                    display: 'auto',
                    formatter: label => `R$${this.adjustCurrency(label)}`
                }
            },
            legend: {
                labels: { fontColor: 'white', fontSize: this.barChartFontSize }
            },
            tooltips: {
                callbacks: {
                    label: tooltipItems =>
                        `R$${this.adjustCurrency(tooltipItems.value)}`
                }
            }
        };

        // Load graph values
        const totalPlanned = [];
        const totalRealized = [];
        const symbols = [];
        this.data.forEach(item => {
            totalPlanned.push(item.totalPlanned);
            totalRealized.push(item.totalRealized);
            symbols.push(item.symbol);
        });
        this.barChartData = [
            { data: totalPlanned, label: 'Total Planejado', datalabels: { display: true } },
            { data: totalRealized, label: 'Total Realizado' }
        ];
        this.barChartLabels = symbols;
    }

    adjustCurrency(label: any) {
        return this.currencyPipe.transform(label, 'R$', '');
    }

    // events
    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
        console.log(event, active);
    }

    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
        console.log(event, active);
    }

    @HostListener('window:scroll')
    private onScroll(): void {
        if (this.isOccluded(this.element.nativeElement)) {
            return;
        }
        this.occluded = false;
    }
    private isOccluded(element: HTMLElement) {
        const rect = element.getBoundingClientRect();
        const elementTop = element.offsetTop;
        const elementBottom = elementTop + rect.height;

        const viewportTop = window.scrollY;
        const viewportBottom = viewportTop + window.innerHeight;

        return !(elementBottom > viewportTop && elementTop < viewportBottom);
    }
}
