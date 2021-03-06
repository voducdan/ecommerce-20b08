import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { userRoutes } from './user.routes';

import { MustMatchDirective } from './matchPassword.directive';

import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserLeftMenu } from './shared/left-menu.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { UserCousesComponent } from './courses/user-courses.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
	declarations: [
		RegistrationComponent,
		LoginComponent,
		UserDetailComponent,
		MustMatchDirective,
		UserLeftMenu,
		UserAccountComponent,
		PaymentMethodComponent,
		UserCousesComponent,
		ResetPasswordComponent,
		ForgotPasswordComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		ReactiveFormsModule,
		CKEditorModule,
		RouterModule.forChild(userRoutes),
	],
})
export class UserModule {}
