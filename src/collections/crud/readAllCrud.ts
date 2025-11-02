import { megio } from './../../index.ts';
import type {
	RespReadAll,
	ReadAllParams,
	Pagination,
	Row,
	ColumnSchema,
} from '../types';

const readAllCrud = async <T = Row>(
	params: ReadAllParams,
): Promise<RespReadAll<T>> => {
	return megio.fetch<
		{
			pagination: Pagination;
			items: T[];
			schema?: ColumnSchema;
		},
		string[]
	>(`megio/collections/read-all`, {
		method: 'POST',
		body: JSON.stringify(params),
	});
};

export default readAllCrud;
