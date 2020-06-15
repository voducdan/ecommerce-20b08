import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { userRoutes } from './user.routes';

import { MustMatchDirective } from './matchPassword.directive';

import { RegistrationComponent } from './registration/registration.component';

@NgModule({
	declarations: [RegistrationComponent, MustMatchDirective],
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		RouterModule.forChild(userRoutes),
	],
})
export class UserModule {}
