import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { RevenueComponent } from './revenue/revenue.component';
import { ProductComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

export const appRoutes: Routes = [
	{ path: '', redirectTo: '/courses', pathMatch: 'full' },
	{ path: 'revenue', component: RevenueComponent },
	{ path: 'courses', component: ProductComponent },
	{
		path: 'course/:courseId',
		component: ProductDetailComponent,
	},
];
