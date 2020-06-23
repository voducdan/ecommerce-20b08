import { Component } from '@angular/core';
import { ClassMethod } from '@angular/compiler';

@Component({
	selector: 'app-dashboard-left-menu',
	template: `<div class="card">
		<div class="card-header">
			<a href="#">Revenue</a>
		</div>

		<div class="card-body">
			<a href="#">New user</a>
		</div>

		<div class="card-body">
			<a href="#">Product management</a>
		</div>

		<div class="card-body">
			<a href="#">User management</a>
		</div>
	</div>`,
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
export class DashboardLeftMenu {}
