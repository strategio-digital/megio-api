import { ResponseInterface } from '../../types';

export type GroupedResourcesWithRoles = {
	groupName: string;
	resources: Array<
		Resource & {
			roles: Role[];
		}
	>;
};

export type Resource = {
	id: string;
	name: string;
	type: string;
	hint?: string;
};

export type ResourceDiff = {
	to_create: string[];
	to_remove: string[];
};

export type ResponseData = {
	roles: Role[];
	resources: Resource[];
	grouped_resources_with_roles: GroupedResourcesWithRoles[];
	resources_diff: ResourceDiff;
};

export type Role = {
	id: string;
	name: string;
	enabled?: boolean;
};

export type RespCreateRole = ResponseInterface<Role, { errors: string[] }>;

export type RespUpdateRole = ResponseInterface<
	{ message: string },
	{ errors: string[] }
>;

export type RespDeleteRole = ResponseInterface<
	{ message: string },
	{ errors: string[] }
>;

export type RespShow = ResponseInterface<ResponseData, { errors: string[] }>;

export type RespUpdate = ResponseInterface<ResponseData, { errors: string[] }>;
