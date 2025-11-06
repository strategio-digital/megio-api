import { megio } from './../../index.ts';
import { RespUpdate, UpdateParams, Row } from '../types';

const updateCrud = async <T = Row>(
	params: UpdateParams<T>,
): Promise<RespUpdate> => {
	return megio.fetch<
		{
			ids: string[];
			message: string;
		},
		{
			errors: string[];
			validation_errors: {
				[key: string]: string[];
				'@': string[];
			};
		}
	>(`megio/collections/update`, {
		method: 'PATCH',
		body: JSON.stringify(params),
	});
};

export default updateCrud;
