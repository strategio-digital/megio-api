import { megio } from './../index.ts'
import type { IRespDeleteRole } from './types'

const deleteRole = async (roleId: string): Promise<IRespDeleteRole> => {
    const resp = await megio.fetch(`megio/resources/delete-role`, {
        method: 'DELETE',
        body: JSON.stringify({ id: roleId })
    })

    return { ...resp, data: resp.data }
}

export default deleteRole