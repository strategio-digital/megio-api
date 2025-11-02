import { megio, setup } from '../src';
import { StorageInterface } from '../src/types';

describe('Discriminated Union API', () => {
	beforeAll(() => {
		const mockStorage: StorageInterface = {
			getItem: jest.fn(),
			setItem: jest.fn(),
			removeItem: jest.fn(),
		};

		setup('http://test/', jest.fn(), mockStorage);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('success response has correct data type with type narrowing', async () => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			status: 200,
			json: async () => ({ id: '123', name: 'Test User' }),
		});

		const resp = await megio.fetch<{ id: string; name: string }, string[]>(
			'test/endpoint',
			{
				method: 'GET',
			},
		);

		// Type narrowing works!
		if (resp.success) {
			expect(resp.status).toBe(200);
			expect(resp.data.id).toBe('123');
			expect(resp.data.name).toBe('Test User');
		} else {
			fail('Expected success response');
		}
	});

	it('error response has error data with type narrowing', async () => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: false,
			status: 401,
			statusText: 'Unauthorized',
			json: async () => ({ errors: ['Invalid credentials', 'Token expired'] }),
		});

		const resp = await megio.fetch<{ id: string }, string[]>('test/endpoint', {
			method: 'GET',
		});

		// Type narrowing works!
		if (!resp.success) {
			expect(resp.status).toBe(401);
			expect(Array.isArray(resp.data)).toBe(true);
			expect(resp.data).toEqual(['Invalid credentials', 'Token expired']);
		} else {
			fail('Expected error response');
		}
	});

	it('unified data property contains success data', async () => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			status: 200,
			json: async () => ({ value: 42 }),
		});

		const { data, success, status } = await megio.fetch<
			{ value: number },
			string[]
		>('test', { method: 'GET' });

		if (success) {
			console.log(status); // 200
			console.log('Request successful:', data.value); // 42
			expect(data.value).toBe(42);
		}
	});

	it('unified data property contains error data', async () => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: false,
			status: 500,
			statusText: 'Server Error',
			json: async () => ({ errors: ['Database connection failed'] }),
		});

		const { data, success, status } = await megio.fetch<
			{ value: number },
			string[]
		>('test', { method: 'GET' });

		if (!success) {
			console.error('Request failed:', data); // ['Database connection failed']
			expect(status).toBe(500);
			expect(data).toEqual(['Database connection failed']);
		}
	});
});
