import { megio } from './../../index.ts';
import type { DeleteParams, RespDelete, Row } from '../types';

const deleteCrud = async <T = Row>(
	params: DeleteParams<T>,
): Promise<RespDelete> => {
	return megio.fetch<{ message: string }, { errors: string[] }>(
		`megio/collections/delete`,
		{
			method: 'DELETE',
			body: JSON.stringify(params),
		},
	);
};

export default deleteCrud;
