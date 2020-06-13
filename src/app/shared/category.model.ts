export interface ICategory {
	_id: string;
	title: string;
	url: string;
	slug: String;
	parents_category: ICategory;
}
