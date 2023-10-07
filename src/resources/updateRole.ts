import { megio } from './../index.ts'
import type { IRespUpdateRole } from './types'

const updateRole = async (roleId: string, resourceId: string, enable: boolean): Promise<IRespUpdateRole> => {
    const resp = await megio.fetch(`megio/resources/update-role`, {
        method: 'POST',
        body: JSON.stringify({
            role_id: roleId,
            resource_id: resourceId,
            enable
        })
    })

    return { ...resp, data: resp.data }
}

export default updateRole