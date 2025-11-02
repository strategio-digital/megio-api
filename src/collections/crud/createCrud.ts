import { megio } from './../../index.ts';
import { CreateParams, RespCreate, Row } from '../types';

const createCrud = async <T = Row>(
	params: CreateParams<T>,
): Promise<RespCreate> => {
	return megio.fetch<
		{
			ids?: string[];
			message?: string;
			validation_errors?: {
				[key: string]: string[];
				'@': string[];
			};
		},
		string[]
	>(`megio/collections/create`, {
		method: 'POST',
		body: JSON.stringify(params),
	});
};

export default createCrud;
