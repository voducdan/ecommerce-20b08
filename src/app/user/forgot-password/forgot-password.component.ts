import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../user.services';
@Component({
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
	constructor(
		private userService: UserService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	resetPassForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
	});

	loginSuccess: Boolean = true;
	loginErr: string;
	onSubmit() {
		this.userService
			.forgotPass(this.resetPassForm.value)
			.subscribe((res) => {
				if (res.success) {
					this.router.navigate(['/user/resetpassword']);
				} else {
					this.loginSuccess = false;
					this.loginErr = 'There is no user with that email';
				}
			});
	}
}
