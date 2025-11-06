import { megio } from './../index.ts';
import type { RespRevokeToken } from './types';

const revokeToken = async (
	user_ids: string[],
	source: string,
): Promise<RespRevokeToken> => {
	return megio.fetch<{ message: string }, { errors: string[] }>(
		`megio/auth/revoke-token`,
		{
			method: 'POST',
			body: JSON.stringify({ source, user_ids }),
		},
	);
};

export default revokeToken;
