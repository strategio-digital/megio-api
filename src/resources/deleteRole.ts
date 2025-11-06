import { megio } from './../index.ts';
import type { RespDeleteRole } from './types';

const deleteRole = async (roleId: string): Promise<RespDeleteRole> => {
	return megio.fetch<{ message: string }, { errors: string[] }>(
		`megio/resources/delete-role`,
		{
			method: 'DELETE',
			body: JSON.stringify({ id: roleId }),
		},
	);
};

export default deleteRole;
