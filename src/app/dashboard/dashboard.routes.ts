import { Routes } from '@angular/router';

import { RevenueComponent } from './revenue/revenue.component';
import { NewuserComponent } from './newuser/new-user.component';
import { ForbiddenComponent } from './shared/forbidden/forbidden.component';

import { AuthGuard } from './shared/auth.guard';

export const dashboardRoutes: Routes = [
	{
		path: '',
		redirectTo: '/dashboard/revenue',
		pathMatch: 'full',
	},
	{ path: 'revenue', component: RevenueComponent, canActivate: [AuthGuard] },
	{ path: 'newuser', component: NewuserComponent, canActivate: [AuthGuard] },
	{ path: '403', component: ForbiddenComponent },
];
