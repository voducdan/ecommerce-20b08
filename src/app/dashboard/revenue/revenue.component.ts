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
	public revenueInMonthData: ChartDataSets[] = [
		{ data: [], label: 'Revenue Of Month' },
	];
	public revenueInMonthLabels: Label[] = [];

	public revenueInYearData: ChartDataSets[] = [
		{ data: [], label: 'Revenue Of Year' },
	];
	public chartOptions: ChartOptions = {
		animation: {
			duration: 1000,
			easing: 'easeOutQuart',
		},
	};
	public revenueInYearLabels: Label[] = [];

	public lineChartColors: Color[] = [
		{
			borderColor: '#97bbcd',
			backgroundColor: '#eaf1f5',
		},
	];
	public lineChartLegend = true;
	public lineChartType = 'line';
	public lineChartPlugins = [];

	numInvoicesInMonth: number;
	numInvoicesInYear: number;
	invoicesOfMonth;
	invoicesOfYear;
	constructor(private revenueService: RevenueService) {}

	ngOnInit() {
		this.revenueService.getRevenue().subscribe(
			(res) => {
				const {
					revenueOfMonth,
					revenueOfYear,
					invoicesOfYear,
					invoicesOfMonth,
				} = res.data;
				this.invoicesOfMonth = invoicesOfMonth;
				this.numInvoicesInMonth = invoicesOfMonth.length;
				revenueOfMonth.map((item) => {
					this.revenueInMonthLabels.push(String(item._id));
					this.revenueInMonthData[0].data.push(item.revenueInMonth);
				});
				this.invoicesOfYear = invoicesOfYear;
				this.numInvoicesInYear = invoicesOfYear.length;
				revenueOfYear.map((item) => {
					this.revenueInYearLabels.push(this.monthToText(item._id));
					this.revenueInYearData[0].data.push(item.revenueInYear);
				});
			},
			(err) => {
				console.log(err);
			}
		);
	}
	monthToText(month: number) {
		const monthInText = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];
		return monthInText[month - 1];
	}
}
