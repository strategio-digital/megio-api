import { Recipe, ResponseInterface } from '../../types';

export type Row<T = Record<string, any>> = {
	id: string;
} & T;

export type ColumnSchema = {
	recipe: Recipe;
	props: ColumnProp[];
	search?: {
		searchables: Searchable[];
	};
};

export type OrderBy = {
	col: string;
	desc: boolean;
};

export type Search = {
	text: string;
};

export type Pagination = {
	currentPage: number;
	lastPage: number;
	itemsPerPage: number;
	itemsCountAll: number;
	orderBy: OrderBy[];
};

export type ColumnProp = {
	renderer: string;
	key: string;
	name: string;
	sortable: boolean;
	visible: boolean;
	formatters: string[]; // class-names
	orderBy: OrderBy[];
};

export type Searchable = {
	column: string;
	relation: string | null;
};

export type RespNavbar = ResponseInterface<{ items: Recipe[] }, null>;

export type CreateParams<T = Row> = {
	recipeKey: string;
	rows: Omit<T, 'id'>[];
};

export type RespCreate = ResponseInterface<
	{
		ids: Row['id'][];
		message: string;
	},
	{
		errors: string[];
		validation_errors: {
			[key: string]: string[];
			'@': string[];
		};
	}
>;

export type UpdateParams<T = Row> = {
	recipeKey: string;
	rows: Array<{
		id: T extends { id: infer ID } ? ID : string;
		data: Omit<T, 'id'>;
	}>;
};

export type RespUpdate = RespCreate;

export type ReadParams<T = Row> = {
	recipeKey: string;
	id: T extends { id: infer ID } ? ID : string;
	schema?: boolean;
	adminPanel?: boolean;
};

export type RespRead<T = Row> = ResponseInterface<T, { errors: string[] }> & {
	schema?: ColumnSchema;
};

export type ReadAllParams = {
	recipeKey: string;
	currentPage: number;
	itemsPerPage: number;
	orderBy?: OrderBy[];
	search?: Search;
	schema?: boolean;
	adminPanel?: boolean;
};

export type RespReadAll<T = Row> = ResponseInterface<
	{
		pagination: Pagination;
		items: T[];
		schema?: ColumnSchema;
	},
	{ errors: string[] }
>;

export type DeleteParams<T = Row> = {
	recipeKey: string;
	ids: (T extends { id: infer ID } ? ID : string)[];
};

export type RespDelete = ResponseInterface<
	{ message: string },
	{ errors: string[] }
>;

export type CreateFormParams = {
	recipeKey: string;
};

export type RespCreateForm = ResponseInterface<
	{
		recipe: Recipe;
		form: FormProp[];
	},
	{ errors: string[] }
>;

export type UpdateFormParams<T = Row> = {
	recipeKey: string;
	id: T extends { id: infer ID } ? ID : string;
};

export type RespUpdateForm = RespCreateForm;

export type FormProp = {
	renderer: string;
	disabled: boolean;
	name: string;
	label: string;
	rules: FormRule[];
	serializers: string[]; // class-names
	attrs: {
		[key: string]: any;
	};
	params: {
		[key: string]: any;
	};
	value: any;
	default_value: any;
	errors: string[];
};

export type FormRule = {
	name: string;
	message: string;
	params: {
		[key: string]: any;
	};
};
