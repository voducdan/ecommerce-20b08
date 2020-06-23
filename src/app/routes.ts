import { Routes } from '@angular/router';

import { ProductComponent } from './products/products.component';

export const appRoutes: Routes = [
	{ path: '', redirectTo: '/courses', pathMatch: 'full' },
	{ path: 'courses', component: ProductComponent },
	{
		path: 'course/:courseId',
		loadChildren: () =>
			import('./product-detail/product-detail.module').then(
				(m) => m.ProductDetailModule
			),
	},
	{
		path: 'user',
		loadChildren: () =>
			import('./user/user.module').then((m) => m.UserModule),
	},
	{
		path: 'dashboard',
		loadChildren: () =>
			import('./dashboard/dashboard.module').then(
				(m) => m.DashBoardModule
			),
	},
	{
		path: '**',
		redirectTo: '/courses',
		pathMatch: 'full',
	},
];
