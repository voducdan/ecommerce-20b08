import { Component, HostListener } from '@angular/core';
import { UserService } from '../user.services';
import { IUser } from 'src/app/shared/user.model';
import { FormGroup, FormControl } from '@angular/forms';
import { GlobalVariables } from 'src/app/global';
@Component({
	templateUrl: './user-detail.component.html',
	styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent {
	user: IUser;
	profileForm: FormGroup;
	avt: File = null;
	previewImage: any = null;
	avtUploadErr: string = null;
	changeAvtSuccess: boolean = false;
	constructor(private UserService: UserService) {}
	ngOnInit() {
		this.UserService.getUser().subscribe((res) => {
			this.user = res.data;
			this.user.image = GlobalVariables.staticImage + this.user.image;
			this.profileForm = new FormGroup({
				firstname: new FormControl(this.user.firstname),
				lastname: new FormControl(this.user.lastname),
				headline: new FormControl(
					this.user.headline ? this.user.headline : ''
				),
				website: new FormControl(
					this.user.website
						? this.user.website
						: 'Website (http(s)://..'
				),
			});
		});
	}
	onAvtChange(event) {
		this.avt = <File>event.target.files[0];
		const imgType = this.avt.type;
		if (imgType.match(/image\/*/) == null) {
			this.avtUploadErr = 'Only images are supported.';
			return;
		}
		const reader = new FileReader();
		reader.readAsDataURL(this.avt);
		reader.onload = (_event) => {
			this.previewImage = _event.target.result;
		};
	}
	onSubmit() {
		this.UserService.updateProfile(this.profileForm.value).subscribe(
			(res) => {
				this.user = res.data;
				this.user.image = GlobalVariables.staticImage + this.user.image;
			}
		);
	}
	updateAvt() {
		this.UserService.updateAvt(this.avt).subscribe((res) => {
			this.user = res.data;
			this.user.image = GlobalVariables.staticImage + this.user.image;
			if (res.success) {
				this.changeAvtSuccess = true;
			}
		});
	}
}
