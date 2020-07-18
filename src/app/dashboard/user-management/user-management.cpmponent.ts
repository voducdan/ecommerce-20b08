import { Component } from '@angular/core';
import { IUser } from 'src/app/shared/user.model';

import { UserManagementService } from './user-management.service';
import { GlobalVariables } from 'src/app/global';
@Component({
	templateUrl: './user-management.cpmponent.html',
	styleUrls: ['./user-management.cpmponent.css'],
})
export class UserManagementComponent {
	users: IUser[];
	constructor(private userManagementService: UserManagementService) {}

	ngOnInit() {
		this.userManagementService.getUsers().subscribe((res) => {
			this.users = res.data;
			this.users.forEach((user) => {
				if (user.image) {
					user.image = GlobalVariables.staticImage + user.image;
				}
			});
		});
	}
	editUser(userId) {}
	deleteUser(userId) {}
	filterUser(searchValue) {}
}
