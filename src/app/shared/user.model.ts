import { IProduct } from './products.model';
export interface IUser {
	_id?: string;
	firstname: string;
	lastname: string;
	headline?: string;
	image?: string;
	email: string;
	password: string;
	role: string;
	payment?: {
		name_on_card: string;
		card_number: string;
		date: string;
		security_code: string;
		zip_code: string;
	};
	enrolled_courses?: IProduct[];
	website?: string;
	create_at?: Date;
	day?: number;
	month?: number;
	year?: number;
	last_modified?: Date;
	cart?: string[];
}
