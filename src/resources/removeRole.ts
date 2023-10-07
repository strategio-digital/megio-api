import { megio } from './../index.ts'
import type { IRespRemoveRole } from './types'

const removeRole = async (roleId: string): Promise<IRespRemoveRole> => {
    const resp = await megio.fetch(`megio/resources/delete-role`, {
        method: 'DELETE',
        body: JSON.stringify({ id: roleId })
    })

    return { ...resp, data: resp.data }
}

export default removeRole