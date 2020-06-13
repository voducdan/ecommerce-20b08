import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductThumnail } from './product.thumnail/product.thumnail.component';

@NgModule({
	imports: [CommonModule],
	declarations: [ProductThumnail],
	exports: [ProductThumnail],
})
export class SharedModule {}
