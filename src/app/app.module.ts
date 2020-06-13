import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { appRoutes } from './routes';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { RevenueComponent } from './revenue/revenue.component';
import { ProductComponent } from './products/products.component';
import { SharedModule } from './shared/shared.module';
@NgModule({
	declarations: [AppComponent, RevenueComponent, ProductComponent],
	imports: [
		RouterModule.forRoot(appRoutes),
		BrowserModule,
		HttpClientModule,
		ChartsModule,
		SharedModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
