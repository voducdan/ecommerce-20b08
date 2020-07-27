import { Routes } from '@angular/router';

import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserAccountComponent } from './user-account/user-account.component';

import { AuthGuard } from '../dashboard/shared/auth.guard';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { UserCousesComponent } from './courses/user-courses.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
export const userRoutes: Routes = [
	{ path: '', redirectTo: '/user/profile', pathMatch: 'full' },
	{ path: 'register', component: RegistrationComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'resetpassword', component: ResetPasswordComponent },
	{ path: 'forgotpassword', component: ForgotPasswordComponent },
	{
		path: 'profile',
		component: UserDetailComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'account',
		component: UserAccountComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'payment',
		component: PaymentMethodComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'courses',
		component: UserCousesComponent,
		canActivate: [AuthGuard],
	},
];
