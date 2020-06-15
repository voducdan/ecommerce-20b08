import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { userRoutes } from './user.routes';

import { MustMatchDirective } from './matchPassword.directive';

import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

@NgModule({
	declarations: [RegistrationComponent, LoginComponent, MustMatchDirective],
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		ReactiveFormsModule,
		RouterModule.forChild(userRoutes),
	],
})
export class UserModule {}
