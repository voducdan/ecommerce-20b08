import { IUser } from './user.model';
export interface IReview {
	content: string;
	content_html: string;
	create_at: string;
	rating: number;
	user: IUser;
	course: string;
}
