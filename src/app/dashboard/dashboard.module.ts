import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

import { dashboardRoutes } from './dashboard.routes';

import { RevenueComponent } from './revenue/revenue.component';
import { NewuserComponent } from './newuser/new-user.component';
import { DashboardLeftMenu } from './shared/left-menu.component';
import { ForbiddenComponent } from './shared/forbidden/forbidden.component';

@NgModule({
	declarations: [
		RevenueComponent,
		NewuserComponent,
		DashboardLeftMenu,
		ForbiddenComponent,
	],
	imports: [
		CommonModule,
		HttpClientModule,
		ChartsModule,
		RouterModule.forChild(dashboardRoutes),
	],
})
export class DashBoardModule {}
