import { megio, setup } from '../src';
import { StorageInterface } from '../src/types';
import { Row } from '../src/collections/types';

// Custom types extending Row
type Product = Row<{
	name: string;
	price: number;
	category: string;
}>;

type User = Row<{
	email: string;
	role: string;
	active: boolean;
}>;

describe('Generic Row API', () => {
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

	it('readCrud with custom Product type returns typed data', async () => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			status: 200,
			json: async () => ({
				id: 'prod-123',
				name: 'Laptop',
				price: 999.99,
				category: 'Electronics',
			}),
		});

		const resp = await megio.collections.read<Product>({
			recipeKey: 'products',
			id: 'prod-123',
		});

		if (resp.success) {
			expect(resp.data.id).toBe('prod-123');
			expect(resp.data.name).toBe('Laptop');
			expect(resp.data.price).toBe(999.99);
			expect(resp.data.category).toBe('Electronics');
		} else {
			fail('Expected success response');
		}
	});

	it('readAllCrud with custom User type returns array of typed items', async () => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			status: 200,
			json: async () => ({
				pagination: {
					currentPage: 1,
					lastPage: 1,
					itemsPerPage: 10,
					itemsCountAll: 2,
					orderBy: [],
				},
				items: [
					{
						id: 'user-1',
						email: 'admin@example.com',
						role: 'admin',
						active: true,
					},
					{
						id: 'user-2',
						email: 'user@example.com',
						role: 'user',
						active: false,
					},
				],
			}),
		});

		const resp = await megio.collections.readAll<User>({
			recipeKey: 'users',
			currentPage: 1,
			itemsPerPage: 10,
		});

		if (resp.success) {
			expect(resp.data.items).toHaveLength(2);
			expect(resp.data.items[0].email).toBe('admin@example.com');
			expect(resp.data.items[0].role).toBe('admin');
			expect(resp.data.items[0].active).toBe(true);
			expect(resp.data.items[1].active).toBe(false);
		} else {
			fail('Expected success response');
		}
	});

	it('createCrud with custom Product type accepts typed params', async () => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			status: 200,
			json: async () => ({
				ids: ['prod-456'],
				message: 'Created successfully',
			}),
		});

		const resp = await megio.collections.create<Product>({
			recipeKey: 'products',
			rows: [
				{
					name: 'Mouse',
					price: 29.99,
					category: 'Accessories',
				},
			],
		});

		if (resp.success) {
			expect(resp.data.ids).toEqual(['prod-456']);
			expect(resp.data.message).toBe('Created successfully');
		} else {
			fail('Expected success response');
		}
	});

	it('updateCrud with custom Product type accepts typed params', async () => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			status: 200,
			json: async () => ({
				ids: ['prod-123'],
				message: 'Updated successfully',
			}),
		});

		const resp = await megio.collections.update<Product>({
			recipeKey: 'products',
			rows: [
				{
					id: 'prod-123',
					data: {
						name: 'Gaming Laptop',
						price: 1299.99,
						category: 'Electronics',
					},
				},
			],
		});

		if (resp.success) {
			expect(resp.data.ids).toEqual(['prod-123']);
			expect(resp.data.message).toBe('Updated successfully');
		} else {
			fail('Expected success response');
		}
	});

	it('deleteCrud with custom Product type accepts typed params', async () => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			status: 200,
			json: async () => ({
				message: 'Deleted successfully',
			}),
		});

		const resp = await megio.collections.delete<Product>({
			recipeKey: 'products',
			ids: ['prod-123', 'prod-456'],
		});

		if (resp.success) {
			expect(resp.data.message).toBe('Deleted successfully');
		} else {
			fail('Expected success response');
		}
	});

	it('error responses maintain type safety', async () => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: false,
			status: 404,
			statusText: 'Not Found',
			json: async () => ({
				errors: ['Product not found'],
			}),
		});

		const resp = await megio.collections.read<Product>({
			recipeKey: 'products',
			id: 'invalid-id',
		});

		if (!resp.success) {
			expect(resp.status).toBe(404);
			expect(resp.data).toEqual(['Product not found']);
		} else {
			fail('Expected error response');
		}
	});

	it('default Row type works without specifying generic', async () => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			status: 200,
			json: async () => ({
				id: 'item-1',
				someField: 'value',
				anotherField: 42,
			}),
		});

		const resp = await megio.collections.read({
			recipeKey: 'generic-collection',
			id: 'item-1',
		});

		if (resp.success) {
			expect(resp.data.id).toBe('item-1');
			// Without generic type, data can have any additional fields
			expect(resp.data.someField).toBe('value');
			expect(resp.data.anotherField).toBe(42);
		} else {
			fail('Expected success response');
		}
	});

	it('validation errors work with generic types', async () => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			status: 200,
			json: async () => ({
				validation_errors: {
					name: ['Name is required'],
					price: ['Price must be a positive number'],
					'@': ['Global validation error'],
				},
			}),
		});

		const resp = await megio.collections.create<Product>({
			recipeKey: 'products',
			rows: [
				{
					name: '',
					price: -10,
					category: 'Electronics',
				},
			],
		});

		if (resp.success) {
			expect(resp.data.validation_errors).toBeDefined();
			expect(resp.data.validation_errors?.name).toEqual(['Name is required']);
			expect(resp.data.validation_errors?.price).toEqual([
				'Price must be a positive number',
			]);
			expect(resp.data.validation_errors?.['@']).toEqual([
				'Global validation error',
			]);
		} else {
			fail('Expected success response with validation errors');
		}
	});
});
