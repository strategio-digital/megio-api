export type ResponseInterface<TSuccess, TError = string[]> =
	| { success: true; status: number; data: TSuccess }
	| { success: false; status: number; data: TError };

export interface StorageInterface {
	getItem(key: string): string | null;
	setItem(key: string, value: string): void;
	removeItem(key: string): void;
}

export type UploadStats = {
	percent: number;
	loaded: number;
	total: number;
};

export type Recipe = {
	name: string;
	key: string;
};
