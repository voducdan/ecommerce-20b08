import { Routes } from '@angular/router';

import { RevenueComponent } from './revenue/revenue.component';

export const dashboardRoutes: Routes = [
	{ path: '', redirectTo: '/dashboard/revenue', pathMatch: 'full' },
	{ path: 'revenue', component: RevenueComponent },
];
