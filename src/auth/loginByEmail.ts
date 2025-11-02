import { getStorage, megio } from './../index';
import type { RespLoginByEmail, AuthUser } from './types';

const loginByEmail = async (
	email: string,
	password: string,
	source: string,
): Promise<RespLoginByEmail> => {
	const resp = await megio.fetch<AuthUser, string[]>('megio/auth/email', {
		method: 'POST',
		body: JSON.stringify({ source, email, password }),
	});

	if (
		resp.success &&
		(resp.data.user.roles.includes('admin') ||
			resp.data.user.resources.length !== 0)
	) {
		getStorage().setItem('megio_user', JSON.stringify(resp.data));
		return resp;
	} else if (resp.success && resp.data.user.resources.length === 0) {
		return {
			success: false,
			status: resp.status,
			data: ['No resources available'],
		};
	}

	return resp;
};

export default loginByEmail;
