import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.services';

import { IUser } from '../../shared/user.model';

@Component({
	selector: 'app-register',
	templateUrl: './registration.component.html',
	styles: [
		`
			em {
				color: #ef0808;
				padding-left: 7px;
				position: absolute;
				bottom: 37px;
				font-size: 13px;
			}
		`,
	],
})
export class RegistrationComponent {
	constructor(private router: Router, private userService: UserService) {}

	user: IUser = {
		lastname: '',
		firstname: '',
		password: '',
		email: '',
	};
	passwordComfirm: string;
	acceptTerm: Boolean = false;
	onSubmit() {
		this.userService.register(this.user).subscribe((res) => {
			if (res.success) {
				this.router
					.navigate(['courses'])
					.then(() => window.location.reload());
			}
		});
	}
}
