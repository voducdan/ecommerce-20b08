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
	user: any = {};
	deleteStatus: number = 0;
	filteredUsers: IUser[];
	options = {
		fieldSeparator: ',',
		quoteStrings: '"',
		decimalseparator: '.',
		showLabels: false,
		headers: ['Firstname', 'Lastname', 'Email', 'Role', 'Create_at'],
		showTitle: true,
		title: 'User information',
		useBom: false,
		removeNewLines: true,
		keys: ['firstname', 'lastname', 'email', 'role', 'create_at'],
	};
	constructor(private userManagementService: UserManagementService) {}

	ngOnInit() {
		this.userManagementService.getUsers().subscribe((res) => {
			this.users = res.data;
			this.filteredUsers = res.data;
			this.users.forEach((user) => {
				if (user.image) {
					user.image = GlobalVariables.staticImage + user.image;
				}
			});
		});
	}
	banUser(userId) {}
	deleteUser(userId) {
		this.userManagementService.deleteUser(userId).subscribe((res) => {
			if (res.success) {
				this.deleteStatus = 1;
				this.users = this.users.filter((item) => item._id != userId);
			} else {
				this.deleteStatus = -1;
			}
		});
	}
	filterUser(searchtTerm) {
		this.users = this.filteredUsers.filter(
			(item) =>
				item.firstname
					.toLowerCase()
					.indexOf(searchtTerm.toLowerCase()) > -1 ||
				item.lastname.toLowerCase().indexOf(searchtTerm.toLowerCase()) >
					-1
		);
		console.log(this.users);
	}
	getUser(userId) {
		this.userManagementService.getUser(userId).subscribe((res) => {
			this.user = res.data[0];
		});
	}
}
