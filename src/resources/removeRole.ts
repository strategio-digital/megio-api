import { megio } from '@/megio-sdk'
import type { IResponse } from '@/megio-sdk/types/IResponse'

export interface IResp extends IResponse {
    data: {
        message: string
    }
}

const removeRole = async (roleId: string): Promise<IResp> => {
    const resp = await megio.fetch(`saas/resources/delete-role`, {
        method: 'DELETE',
        body: JSON.stringify({ id: roleId })
    })

    return { ...resp, data: resp.data }
}

export default removeRole