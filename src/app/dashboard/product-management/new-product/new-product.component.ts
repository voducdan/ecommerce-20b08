import { Component } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	templateUrl: './new-product.component.html',
	styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent {
	Editor = ClassicEditor;
	newProductForm = new FormGroup({
		name: new FormControl('', [Validators.required, Validators.email]),
		headline: new FormControl('', [
			Validators.required,
			Validators.minLength(6),
		]),
		price: new FormControl(''),
		concurrent: new FormControl(''),
		author: new FormControl(''),
		image: new FormControl(''),
		language: new FormControl(''),
	});
}
