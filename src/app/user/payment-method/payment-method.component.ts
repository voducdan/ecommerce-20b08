import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../user.services';
@Component({
	templateUrl: './payment-method.component.html',
	styleUrls: ['./payment-method.component.css'],
})
export class PaymentMethodComponent {
	paymentForm = new FormGroup({
		typeOfCard: new FormControl(''),
		nameOnCard: new FormControl(''),
		cardNumber: new FormControl(''),
		expirtion_date: new FormControl(''),
		cvc: new FormControl(''),
	});
	payment = null;
	addNew: boolean = false;
	constructor(private userService: UserService) {}

	ngOnInit() {
		this.userService.getUserPayment().subscribe((res) => {
			if (res.data.payment) {
				this.payment = res.data.payment;
				this.paymentForm = new FormGroup({
					typeOfCard: new FormControl(this.payment.type),
					nameOnCard: new FormControl(this.payment.name_on_card),
					cardNumber: new FormControl(this.payment.card_number),
					expirtion_date: new FormControl(this.payment.date),
					cvc: new FormControl(this.payment.security_code),
				});
			}
		});
	}
	addNewPayment() {
		this.addNew = true;
	}
	onSubmit() {
		this.userService
			.updateUserPayment(this.paymentForm.value)
			.subscribe((res) => {
				this.payment = res.data.payment;
				this.paymentForm = new FormGroup({
					typeOfCard: new FormControl(this.payment.type),
					nameOnCard: new FormControl(this.payment.name_on_card),
					cardNumber: new FormControl(this.payment.card_number),
					expirtion_date: new FormControl(this.payment.date),
					cvc: new FormControl(this.payment.security_code),
				});
			});
	}
}
