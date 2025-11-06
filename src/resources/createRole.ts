import { megio } from './../index.ts';
import type { RespCreateRole, Role } from './types';

const createRole = async (name: string): Promise<RespCreateRole> => {
	return megio.fetch<Role, { errors: string[] }>(
		`megio/resources/create-role`,
		{
			method: 'POST',
			body: JSON.stringify({ name }),
		},
	);
};

export default createRole;
