import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-dashboard-left-menu',
	templateUrl: './left-menu.component.html',
	styles: [
		`
			:host {
				height: 100%;
			}
			#day-revenue {
				width: 400px;
				height: 200px;
			}

			.card-body,
			.card-header {
				padding: 0.5rem !important;
			}
		`,
	],
})
export class DashboardLeftMenu {
	isActive: number;
	constructor(private route: Router) {}
	ngOnInit() {
		if (this.route.url.includes('newuser')) {
			this.isActive = 2;
		} else if (this.route.url.includes('revenue')) {
			this.isActive = 1;
		}
	}
}
