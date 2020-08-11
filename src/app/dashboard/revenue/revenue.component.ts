import { Component } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Router } from '@angular/router';

import { Color, Label } from 'ng2-charts';

import { RevenueService } from './revenue.services';

@Component({
	selector: 'my-app',
	templateUrl: './revenue.component.html',
	styleUrls: ['./revenue.component.css'],
})
export class RevenueComponent {
	public revenueInMonthData: ChartDataSets[] = [
		{ data: [], label: 'Revenue Of Month', yAxisID: 'A' },
		{
			data: [],
			label: 'Invoices Of Month',
			yAxisID: 'B',
			type: 'bar',
			backgroundColor: '#ea65da',
		},
	];
	public revenueInMonthLabels: Label[] = [];

	public revenueInYearData: ChartDataSets[] = [
		{ data: [], label: 'Revenue Of Year', yAxisID: 'A' },
		{
			data: [],
			label: 'Invoices Of Year',
			yAxisID: 'B',
			type: 'bar',
			backgroundColor: '#ea65da',
		},
	];
	public revenueInYearLabels: Label[] = [];

	public revenueByCategoryData: ChartDataSets[] = [
		{ data: [], label: 'Revenue By Category, total:' },
	];
	public revenueByCategoryLabels: Label[] = [];
	public invoicesByCategoryData: ChartDataSets[] = [
		{ data: [], label: 'Invoices By Category total:' },
	];
	public chartOptions: ChartOptions = {
		responsive: true,
		animation: {
			duration: 1000,
			easing: 'easeOutQuart',
		},
		scales: {
			yAxes: [
				{
					id: 'A',
					type: 'linear',
					position: 'left',
				},
				{
					id: 'B',
					type: 'linear',
					position: 'right',
					ticks: {
						beginAtZero: false,
					},
				},
			],
		},
	};

	public lineChartColors: Color[] = [
		{
			borderColor: '#97bbcd',
			backgroundColor: '#eaf1f5',
		},
	];

	public barChartColors: Color[] = [
		{
			borderColor: '#2376d0',
			backgroundColor: '#97bbcd',
		},
	];
	public lineChartLegend = true;
	public lineChartType = 'line';
	public barChartType = 'bar';
	public lineChartPlugins = [];

	numInvoicesInMonth: number;
	numInvoicesInYear: number;
	invoicesOfMonth;
	invoicesOfYear;
	totalMonth: any;
	totalYear: any;
	currMonth: number = new Date().getMonth() + 1;
	categories: string[] = [];
	months: number[] = [...Array(12).keys()];
	constructor(
		private revenueService: RevenueService,
		private router: Router
	) {}

	ngOnInit() {
		this.revenueService.getRevenue().subscribe(
			(res) => {
				if (!res.success && res.error === 'Unauthorized') {
					return this.router.navigate(['dashboard/403']);
				}
				const {
					revenueOfMonth,
					revenueOfYear,
					invoicesOfYear,
					invoicesOfMonth,
					totalMonth,
					totalYear,
					countInvoicesOfYear,
					countInvoicesOfMonth,
				} = res.data;
				this.totalMonth = totalMonth[0];
				this.totalYear = totalYear[0];
				this.invoicesOfMonth = invoicesOfMonth;
				this.numInvoicesInMonth = invoicesOfMonth.length;
				revenueOfMonth.map((item) => {
					this.revenueInMonthLabels.push(String(item._id));
					this.revenueInMonthData[0].data.push(item.revenueInMonth);
				});
				countInvoicesOfMonth.map((item) => {
					this.revenueInMonthData[1].data.push(item.count);
				});

				this.invoicesOfYear = invoicesOfYear;
				this.numInvoicesInYear = invoicesOfYear.length;
				revenueOfYear.map((item) => {
					this.revenueInYearLabels.push(this.monthToText(item._id));
					this.revenueInYearData[0].data.push(item.revenueInYear);
				});
				countInvoicesOfYear.map((item) => {
					this.revenueInYearData[1].data.push(item.count);
				});
			},
			(err) => {
				console.log(err);
			}
		);
		this.revenueService.getRevenueByCategory().subscribe(
			(res) => {
				const revenueOfCategory = res.data;
				for (let item of Object.entries(revenueOfCategory)) {
					this.revenueByCategoryLabels.push(String(item[0]));
					this.categories.push(item[0]);
					this.revenueByCategoryData[0].data.push(
						Number(item[1]['revenue'])
					);
					this.invoicesByCategoryData[0].data.push(
						Number(item[1]['count'])
					);
				}
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
	monthSelected(month) {
		this.revenueService.getInSingeMonthRevenue(month).subscribe(
			(res) => {
				const {
					revenueOfMonth,
					invoicesOfMonth,
					totalMonth,
					countInvoicesOfMonth,
				} = res.data;
				this.revenueInMonthData = [
					{ data: [], label: 'Revenue Of Month', yAxisID: 'A' },
					{
						data: [],
						label: 'Invoices Of Month',
						yAxisID: 'B',
						type: 'bar',
						backgroundColor: '#ea65da',
					},
				];
				this.revenueInMonthLabels = [];

				this.totalMonth = totalMonth[0];
				this.invoicesOfMonth = invoicesOfMonth;
				this.numInvoicesInMonth = invoicesOfMonth.length;
				revenueOfMonth.map((item) => {
					this.revenueInMonthLabels.push(String(item._id));
					this.revenueInMonthData[0].data.push(item.revenueInMonth);
				});
				countInvoicesOfMonth.map((item) => {
					this.revenueInMonthData[1].data.push(item.count);
				});
			},
			(err) => {
				console.log(err);
			}
		);
	}
}
