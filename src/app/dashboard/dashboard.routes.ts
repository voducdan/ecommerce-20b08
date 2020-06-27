import { Routes } from '@angular/router';

import { RevenueComponent } from './revenue/revenue.component';
import { NewuserComponent } from './newuser/new-user.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { NewProductComponent } from './product-management/new-product/new-product.component';
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
	{
		path: 'products',
		component: ProductManagementComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'products/new',
		component: NewProductComponent,
		canActivate: [AuthGuard],
	},
	{ path: '403', component: ForbiddenComponent },
];
