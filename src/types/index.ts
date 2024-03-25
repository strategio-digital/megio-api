export interface IResponse {
    data?: any
    success: boolean
    status: number
    errors: string[]
}

export interface IStorage {
    getItem(key: string): string | null;

    setItem(key: string, value: string): void;

    removeItem(key: string): void;
}