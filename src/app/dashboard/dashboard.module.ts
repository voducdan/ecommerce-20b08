import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { Angular2CsvModule } from 'angular2-csv';

import { dashboardRoutes } from './dashboard.routes';

import { RevenueComponent } from './revenue/revenue.component';
import { NewuserComponent } from './newuser/new-user.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { NewProductComponent } from './product-management/new-product/new-product.component';
import { UserManagementComponent } from './user-management/user-management.cpmponent';
import { DashboardLeftMenu } from './shared/left-menu.component';
import { ForbiddenComponent } from './shared/forbidden/forbidden.component';
import { CustomAngular2csvComponent } from './user-management/angular2csv.component';
@NgModule({
	declarations: [
		RevenueComponent,
		NewuserComponent,
		ProductManagementComponent,
		NewProductComponent,
		DashboardLeftMenu,
		ForbiddenComponent,
		UserManagementComponent,
		CustomAngular2csvComponent,
	],
	imports: [
		CommonModule,
		HttpClientModule,
		ChartsModule,
		CKEditorModule,
		Angular2CsvModule,
		RouterModule.forChild(dashboardRoutes),
	],
	exports: [DashboardLeftMenu],
})
export class DashBoardModule {}
