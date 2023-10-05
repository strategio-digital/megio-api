import { megio } from '@/megio-sdk'
import type { IResponse } from '@/megio-sdk/types/IResponse'
import type { IRole } from '@/megio-sdk/resources/types/IRole'

export interface IResp extends IResponse {
    data: IRole
}

const createRole = async (name: string): Promise<IResp> => {
    const resp = await megio.fetch(`saas/resources/create-role`, {
        method: 'POST',
        body: JSON.stringify({ name })
    })

    return { ...resp, data: resp.data }
}

export default createRole