import { megio } from './../../index.ts';
import type { RespRead, ReadParams, Row } from '../types';

const readCrud = async <T = Row>(params: ReadParams): Promise<RespRead<T>> => {
	return megio.fetch<T, { errors: string[] }>(`megio/collections/read`, {
		method: 'POST',
		body: JSON.stringify(params),
	});
};

export default readCrud;
