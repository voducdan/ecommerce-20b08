import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

import { dashboardRoutes } from './dashboard.routes';

import { RevenueComponent } from './revenue/revenue.component';
import { DashboardLeftMenu } from './shared/left-menu.component';

@NgModule({
	declarations: [RevenueComponent, DashboardLeftMenu],
	imports: [
		CommonModule,
		HttpClientModule,
		ChartsModule,
		RouterModule.forChild(dashboardRoutes),
	],
})
export class DashBoardModule {}
