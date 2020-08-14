import { Component } from '@angular/core';
import { Angular2CsvComponent } from 'angular2-csv';

@Component({
	selector: 'app-angular2csv',
	template: '<div (click)="onDownload()"><ng-content></ng-content></div>',
})
export class CustomAngular2csvComponent extends Angular2CsvComponent {}
