import type { ResponseInterface } from '../../types';
import type { Row } from '../../collections/types';

export type AuthUser = {
	bearer_token: string;
	bearer_token_id: string;
	user: {
		id: string;
		email: string;
		roles: string[];
		resources: string[];
	};
};

export type User = Row<{
	email: string;
	role: string;
}>;

export type RespLoginByEmail = ResponseInterface<AuthUser, string[]>;

export type RespRevokeToken = ResponseInterface<{ message: string }, string[]>;
