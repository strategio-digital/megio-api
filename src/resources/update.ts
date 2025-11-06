import { megio } from './../index.ts';
import type { RespUpdate, ResponseData } from './types';

const update = async (
	viewResources: string[],
	makeViewDiff: boolean = true,
): Promise<RespUpdate> => {
	return megio.fetch<ResponseData, { errors: string[] }>(
		`megio/resources/update`,
		{
			method: 'POST',
			body: JSON.stringify({
				view_resources: viewResources,
				make_view_diff: makeViewDiff,
			}),
		},
	);
};

export default update;
