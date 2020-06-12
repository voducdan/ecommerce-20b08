import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';

import { Color, Label } from 'ng2-charts';

import { RevenueService } from './revenue.services';

@Component({
	selector: 'my-app',
	templateUrl: './revenue.component.html',
	styleUrls: ['./revenue.component.css'],
})
export class RevenueComponent {
	public lineChartData: ChartDataSets[] = [
		{ data: [], label: 'Revenue Of Month' },
	];
	public lineChartLabels: Label[] = [];
	//   public lineChartOptions: (ChartOptions & { annotation: any }) = {
	//     responsive: true,
	//   };
	public lineChartColors: Color[] = [
		{
			borderColor: 'black',
			backgroundColor: 'rgba(255,0,0,0.3)',
		},
	];
	public lineChartLegend = true;
	public lineChartType = 'line';
	public lineChartPlugins = [];

	constructor(private revenueService: RevenueService) {}

	ngOnInit() {
		this.revenueService.getRevenue().subscribe(
			(res) => {
				const { revenueOfMonth } = res.data;
				revenueOfMonth.map((item) => {
					this.lineChartLabels.push(String(item._id));
					this.lineChartData[0].data.push(item.revenueInMonth);
				});
			},
			(err) => {
				console.log(err);
			}
		);
	}
}
