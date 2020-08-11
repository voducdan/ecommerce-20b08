import { Component } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Router } from '@angular/router';

import { Color, Label } from 'ng2-charts';
import { NewuserService } from './new-user.services';

@Component({
	templateUrl: './new-user.component.html',
	styleUrls: ['./new-user.component.css'],
})
export class NewuserComponent {
	public newUserInMonthData: ChartDataSets[] = [
		{ data: [], label: 'New user in month' },
	];
	public newUserInMonthInMonthLabels: Label[] = [];
	public newUserInYearData: ChartDataSets[] = [
		{ data: [], label: 'New user in year' },
	];
	public newUserInYearLabels: Label[] = [];

	public chartOptions: ChartOptions = {
		responsive: true,
		animation: {
			duration: 1000,
			easing: 'easeOutQuart',
		},
	};

	public lineChartColors: Color[] = [
		{
			borderColor: '#97bbcd',
			backgroundColor: '#eaf1f5',
		},
	];

	public lineChartLegend = true;
	public lineChartType = 'line';
	public lineChartPlugins = [];

	usersInMonth: any;
	numOfUsersInMonth: any;
	countUserInMonth: number;
	usersInYear: any;
	numOfUsersInYear: any;
	countUserInYear: number;
	currMonth: number = new Date().getMonth() + 1;
	months: number[] = [...Array(12).keys()];
	constructor(
		private router: Router,
		private newuserService: NewuserService
	) {}

	ngOnInit() {
		this.newuserService.getNewuserInMonth().subscribe((res) => {
			if (!res.success && res.error === 'Unauthorized') {
				return this.router.navigate(['dashboard/403']);
			}
			this.usersInMonth = res.data['usersInMonth'];
			this.numOfUsersInMonth = res.data['numOfUsersInMonth'];
			this.countUserInMonth = res.data['countUserInMonth'][0]
				? res.data['countUserInMonth'][0].count
				: 0;
			this.usersInYear = res.data['usersInYear'];
			this.numOfUsersInYear = res.data['numOfUsersInYear'];
			this.countUserInYear = res.data['countUserInYear'][0].count;
			this.numOfUsersInMonth.map((item) => {
				this.newUserInMonthInMonthLabels.push(String(item._id));
				this.newUserInMonthData[0].data.push(item.count);
			});
			this.numOfUsersInYear.map((item) => {
				this.newUserInYearLabels.push(String(item._id));
				this.newUserInYearData[0].data.push(item.count);
			});
			console.log(this.countUserInYear);
		});
	}
	monthSelected(month) {
		this.newuserService.getNewuserInSingleMonth(month).subscribe((res) => {
			this.newUserInMonthData = [
				{ data: [], label: 'New user in month' },
			];
			this.newUserInMonthInMonthLabels = [];

			this.usersInMonth = res.data['usersInMonth'];
			this.numOfUsersInMonth = res.data['numOfUsersInMonth'];
			this.countUserInMonth =
				res.data['countUserInMonth'].length > 0
					? res.data['countUserInMonth'][0].count
					: 0;
			this.numOfUsersInMonth.map((item) => {
				this.newUserInMonthInMonthLabels.push(String(item._id));
				this.newUserInMonthData[0].data.push(item.count);
			});
		});
	}
}
