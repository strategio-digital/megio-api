import { megio, setup } from '../src'
import { IStorage } from '../src/types'
import { IResource, IRole } from '../src/resources/types'

describe('resources endpoint url tests', () => {
    const storageData = new Map<string, string>()

    const storage: IStorage = {
        getItem: (key: string) => storageData.get(key) || null,
        setItem: (key: string, value: string) => storageData.set(key, value),
        removeItem: (key: string) => storageData.delete(key)
    }

    let resourceId: IResource['id'] = ''
    let roleId: IRole['id'] = ''

    beforeAll(async () => {
        setup('http://localhost:8090/', () => {
        }, storage)

        await megio.auth.loginByEmail('admin@test.cz', 'Test1234', 'admin')
    })

    it('resources read all', async () => {
        const resp = await megio.resources.readAll()

        if (resp.success) {
            resourceId = resp.data.resources[0].id
        }

        expect(resp.success).toBeTruthy()
    })

    it('resources update', async () => {
        const resp = await megio.resources.update([])
        expect(resp.success).toBeTruthy()
    })

    it('create role', async () => {
        const resp = await megio.resources.createRole('test-role')
        if (resp.success) {
            roleId = resp.data.id
        }
        expect(resp.success).toBeTruthy()
    })

    it('update role', async () => {
        const resp = await megio.resources.updateRole(roleId, resourceId, false)
        expect(resp.success).toBeTruthy()
    })

    it('delete role', async () => {
        const resp = await megio.resources.deleteRole(roleId)
        expect(resp.success).toBeTruthy()
    })
})
