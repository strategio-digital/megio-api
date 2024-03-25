import { megio, setup } from '../src'
import { IStorage } from '../src/types'
import { IRespCreate } from '../src/collections/types'

describe('collection endpoint url tests', () => {
    const storageData = new Map<string, string>()

    const storage: IStorage = {
        getItem: (key: string) => storageData.get(key) || null,
        setItem: (key: string, value: string) => storageData.set(key, value),
        removeItem: (key: string) => storageData.delete(key)
    }

    let row_id: IRespCreate['data']['ids'][0] = ''

    beforeAll(async () => {
        setup('http://localhost:8090/', () => {
        }, storage)

        await megio.auth.loginByEmail('admin@test.cz', 'Test1234', 'admin')
    })

    it('collection navbar', async () => {
        const resp = await megio.collectionsExtra.navbar()
        expect(resp.success).toBeTruthy()
    })

    it('collection create', async () => {
        const number = Math.floor(Math.random() * 1000)
        const resp = await megio.collections.create({
            recipe: 'user',
            rows: [
                {
                    email: `jest-${number}@strategio.dev`,
                    password: 'Test1234',
                    password_check: 'Test1234'
                }
            ]
        })

        if (resp.success) {
            row_id = resp.data.ids[0]
        }

        expect(resp.success).toBeTruthy()
    })

    it('collection update', async () => {
        const number = Math.floor(Math.random() * 1000)
        const resp = await megio.collections.update({
            recipe: 'user',
            rows: [
                {
                    id: row_id,
                    data: {
                        email: `jest-${number}@strategio.dev`,
                    }
                }
            ]
        })

        expect(resp.success).toBeTruthy()
    })

    it('collection read all', async () => {
        const resp = await megio.collections.readAll({
            recipe: 'user',
            schema: false,
            currentPage: 1,
            itemsPerPage: 10,
            orderBy: [
                { col: 'createdAt', desc: true },
                { col: 'id', desc: true }
            ]
        })

        expect(resp.success).toBeTruthy()
    })

    it('collection read', async () => {
        const resp = await megio.collections.read({
            recipe: 'user',
            schema: false,
            id: row_id
        })

        expect(resp.success).toBeTruthy()
    })

    it('collection form create', async () => {
        const resp = await megio.collectionsExtra.creatingForm({
            recipe: 'user',
        })

        expect(resp.success).toBeTruthy()
    })

    it('collection form update', async () => {
        const resp = await megio.collectionsExtra.updatingForm({
            recipe: 'user',
            id: row_id
        })

        expect(resp.success).toBeTruthy()
    })

    it('collection delete', async () => {
        const resp = await megio.collections.delete({
            recipe: 'user',
            ids: [row_id]
        })

        expect(resp.success).toBeTruthy()
    })
})
