import { Routes } from '@angular/router';

import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserAccountComponent } from './user-account/user-account.component';

export const userRoutes: Routes = [
	{ path: '', redirectTo: '/user/profile', pathMatch: 'full' },
	{ path: 'register', component: RegistrationComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'profile', component: UserDetailComponent },
	{ path: 'account', component: UserAccountComponent },
];
