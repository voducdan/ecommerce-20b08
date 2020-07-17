import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-user-left-menu',
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
				border: none;
			}
		`,
	],
})
export class UserLeftMenu {
	isActive: number;
	constructor(private route: Router) {}
	ngOnInit() {
		if (this.route.url.includes('profile')) {
			this.isActive = 1;
		} else if (this.route.url.includes('account')) {
			this.isActive = 2;
		} else if (this.route.url.includes('payment')) {
			this.isActive = 3;
		} else if (this.route.url.includes('courses')) {
			this.isActive = 4;
		}
	}
}
