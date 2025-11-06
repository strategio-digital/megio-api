import { megio } from './../index.ts';
import type { RespUpdateRole } from './types';

const updateRole = async (
	roleId: string,
	resourceId: string,
	enable: boolean,
): Promise<RespUpdateRole> => {
	return megio.fetch<{ message: string }, { errors: string[] }>(
		`megio/resources/update-role`,
		{
			method: 'POST',
			body: JSON.stringify({
				role_id: roleId,
				resource_id: resourceId,
				enable,
			}),
		},
	);
};

export default updateRole;
