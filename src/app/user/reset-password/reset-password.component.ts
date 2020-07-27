import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../user.services';
@Component({
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
	constructor(
		private userService: UserService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	newPassForm = new FormGroup({
		password: new FormControl('', [
			Validators.required,
			Validators.minLength(6),
		]),
		resettoken: new FormControl(''),
	});
	loginSuccess: Boolean = true;
	loginErr: string;
	onSubmit() {
		this.userService.resetPass(this.newPassForm.value).subscribe((res) => {
			if (res.success) {
				this.router.navigate(['user']);
			} else {
				this.loginSuccess = false;
				this.loginErr = 'Invalid token';
			}
		});
	}
}
