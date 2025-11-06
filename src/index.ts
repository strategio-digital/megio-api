import loginByEmail from './auth/loginByEmail';
import logout from './auth/logout';
import user from './auth/user';

import createCrud from './collections/crud/createCrud';
import updateCrud from './collections/crud/updateCrud';
import readAllCrud from './collections/crud/readAllCrud';
import readCrud from './collections/crud/readCrud';
import deleteCrud from './collections/crud/deleteCrud';

import creatingForm from './collections/form/creatingForm';
import updatingForm from './collections/form/updatingForm';
import navbar from './collections/meta/navbar';

import revokeToken from './auth/revokeToken';
import updateResources from './resources/update';

import readAllResources from './resources/readAll';
import createRole from './resources/createRole';
import updateRole from './resources/updateRole';

import deleteRole from './resources/deleteRole';
import { ResponseInterface, StorageInterface, UploadStats } from './types';

const storage: StorageInterface = {
	getItem: (key: string) => localStorage.getItem(key),
	setItem: (key: string, value: string) => localStorage.setItem(key, value),
	removeItem: (key: string) => localStorage.removeItem(key),
};

const props = {
	baseUrl: 'http://localhost:8090/',
	errorHandler: function (response: Response, errorData: any) {
		console.error(response.status, errorData);
	} as (response: Response, errorData: any) => void,
	storage,
};

export function getStorage() {
	return props.storage;
}

export function setup<Err = { errors: string[] }>(
	baseUrl: string,
	errorHandler: (response: Response, errorData: Err) => void,
	storage: StorageInterface | null = null,
) {
	props.baseUrl = baseUrl;
	props.errorHandler = errorHandler;
	if (storage !== null) {
		props.storage = storage;
	}
}

async function fetchApi<TData, TError>(
	uri: string,
	options: RequestInit,
): Promise<ResponseInterface<TData, TError>> {
	const headers: Record<string, any> = {
		'Content-Type': 'application/json',
		...options?.headers,
	};

	if (headers['Content-Type'] === 'none') {
		delete headers['Content-Type'];
	}

	const info: RequestInit = {
		...options,
		headers,
	};

	const currentUser = user.get();

	if (currentUser) {
		info.headers = {
			...info.headers,
			Authorization: `Bearer ${currentUser.bearer_token}`,
		};
	}

	const response = await fetch(props.baseUrl + uri, info);
	let json = null;

	try {
		json = await response.json();
	} catch (e) {}

	const statusText =
		response.statusText !== ''
			? response.statusText
			: `Error ${response.status} (no status text)`;

	if (response.ok) {
		return {
			success: true,
			status: response.status,
			data: json,
		};
	} else {
		const errorData = json || { general: [statusText] };
		props.errorHandler(response, errorData);
		return {
			success: false,
			status: response.status,
			data: errorData as TError,
		};
	}
}

async function upload<TData, TError>(
	uri: string,
	formData: FormData,
	onProgress: (stats: UploadStats) => void,
): Promise<ResponseInterface<TData, TError>> {
	return new Promise((resolve) => {
		const xhr = new XMLHttpRequest();

		xhr.upload.onprogress = (event: ProgressEvent) => {
			if (event.lengthComputable) {
				const percentComplete = (event.loaded / event.total) * 100;
				onProgress({
					percent: percentComplete,
					loaded: event.loaded,
					total: event.total,
				});
			}
		};

		xhr.onload = async () => {
			const response = xhrToResponse(xhr);
			let json = null;

			try {
				json = await response.json();
			} catch (e) {}

			const statusText =
				response.statusText !== ''
					? response.statusText
					: `Error ${response.status} (no status text)`;

			if (response.ok) {
				return resolve({
					success: true,
					status: response.status,
					data: json,
				});
			} else {
				const errorData = json || { general: [statusText] };
				props.errorHandler(response, errorData);
				return resolve({
					success: false,
					status: response.status,
					data: errorData as TError,
				});
			}
		};

		xhr.onerror = () => {
			const errorData = [xhr.responseText || 'Network error'];
			return resolve({
				success: false,
				status: xhr.status,
				data: errorData as TError,
			});
		};

		xhr.open('POST', uri);

		const currentUser = user.get();

		if (currentUser) {
			xhr.setRequestHeader(
				'Authorization',
				`Bearer ${currentUser.bearer_token}`,
			);
		}

		xhr.send(formData);
	});
}

function xhrToResponse(xhr: XMLHttpRequest): Response {
	const headers = new Headers();
	const allHeaders = xhr.getAllResponseHeaders();

	allHeaders
		.trim()
		.split(/[\r\n]+/)
		.forEach((line) => {
			const parts = line.split(': ');
			const header = parts.shift();
			const value = parts.join(': ');
			if (header) {
				headers.append(header, value);
			}
		});

	const body = xhr.responseText;

	return new Response(body, {
		status: xhr.status,
		statusText: xhr.statusText,
		headers: headers,
	});
}

export const megio = {
	fetch: fetchApi,
	upload,
	collections: {
		create: createCrud,
		update: updateCrud,
		read: readCrud,
		readAll: readAllCrud,
		delete: deleteCrud,
	},
	collectionsExtra: {
		navbar,
		creatingForm,
		updatingForm,
	},
	auth: {
		user,
		loginByEmail,
		logout,
		revokeToken,
	},
	resources: {
		readAll: readAllResources,
		update: updateResources,
		createRole,
		updateRole,
		deleteRole,
	},
};
