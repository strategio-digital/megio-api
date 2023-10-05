import { megio } from '@/megio-sdk'
import type { IResponse } from '@/megio-sdk/types/IResponse'

export interface IResp extends IResponse {
    data: {
        message: string
    }
}

const updateRole = async (roleId: string, resourceId: string, enable: boolean): Promise<IResp> => {
    const resp = await megio.fetch(`saas/resources/update-role`, {
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