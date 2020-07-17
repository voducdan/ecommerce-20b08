import { Component } from '@angular/core';
import { IUser } from 'src/app/shared/user.model';
import { UserService } from '../user.services';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	templateUrl: './user-account.component.html',
	styleUrls: ['./user-account.component.css'],
})
export class UserAccountComponent {
	user: IUser;
	ChangePassError: string = null;
	ChangePassSuccess: string = null;
	changePassForm: FormGroup = new FormGroup({
		currPass: new FormControl('', [
			Validators.required,
			Validators.minLength(6),
		]),
		newPass: new FormControl('', [
			Validators.required,
			Validators.minLength(6),
		]),
		confirmPass: new FormControl(''),
	});
	constructor(private userService: UserService) {}
	ngOnInit() {
		this.userService.getUser().subscribe((res) => {
			this.user = res.data;
		});
	}
	changePassword() {
		this.userService
			.changePass({
				currPass: this.changePassForm.value.currPass,
				newPass: this.changePassForm.value.confirmPass,
			})
			.subscribe((res) => {
				if (!res.success) {
					this.ChangePassError = res.error.error;
				} else {
					this.ChangePassSuccess = 'Password has changed';
				}
			});
	}
}
