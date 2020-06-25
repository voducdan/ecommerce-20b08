import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../user.services';
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent {
	constructor(
		private userService: UserService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	loginForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [
			Validators.required,
			Validators.minLength(6),
		]),
	});
	loginSuccess: Boolean = true;
	loginErr: string;
	redirectURL: string;
	onSubmit() {
		this.userService.login(this.loginForm.value).subscribe((res) => {
			if (res.success) {
				let params = this.route.snapshot['queryParams'];
				if (params['redirectURL']) {
					this.redirectURL = params['redirectURL'];
				}
				if (this.redirectURL) {
					this.router
						.navigateByUrl(this.redirectURL)
						.catch(() => this.router.navigate(['courses']));
				} else {
					this.router.navigate(['courses']);
				}
			} else {
				this.loginSuccess = false;
				this.loginErr = res.error.error;
				console.log(this.loginErr);
			}
		});
	}
}
