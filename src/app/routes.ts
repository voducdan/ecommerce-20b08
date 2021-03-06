import { Routes } from '@angular/router';

import { ProductComponent } from './products/products.component';
import { AboutComponent } from './about-us/about.component';
import { SearchCoursesComponent } from './search-courses/search-courses.component';
import { CartComponent } from './cart/cart.component';

export const appRoutes: Routes = [
	{ path: '', redirectTo: '/courses', pathMatch: 'full' },
	{ path: 'courses', component: ProductComponent },
	{ path: 'cart', component: CartComponent },
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
		path: 'about',
		component: AboutComponent,
	},
	{
		path: 'search/course',
		component: SearchCoursesComponent,
	},
	{
		path: '**',
		redirectTo: '/courses',
		pathMatch: 'full',
	},
];
