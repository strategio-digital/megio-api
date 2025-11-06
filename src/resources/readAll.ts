import { megio } from './../index.ts';
import type { RespShow, ResponseData } from './types';

const readAll = async (
	viewResources: string[] | null = null,
	makeViewDiff: boolean = true,
): Promise<RespShow> => {
	return megio.fetch<ResponseData, { errors: string[] }>(
		`megio/resources/read-all`,
		{
			method: 'POST',
			body: JSON.stringify({
				view_resources: viewResources,
				make_view_diff: makeViewDiff,
			}),
		},
	);
};

export default readAll;
