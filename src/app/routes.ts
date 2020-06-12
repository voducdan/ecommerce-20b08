import { Routes } from '@angular/router';

import { RevenueComponent } from './revenue/revenue.component';
import { ProductComponent } from './products/products.component';

export const appRoutes: Routes = [
	{ path: '', redirectTo: '/courses', pathMatch: 'full' },
	{ path: 'revenue', component: RevenueComponent },
	{ path: 'courses', component: ProductComponent },
	{
		path: 'course/:courseId',
		loadChildren: () =>
			import('./product-detail/product-detail.module').then(
				(m) => m.ProductDetailModule
			),
	},
];
