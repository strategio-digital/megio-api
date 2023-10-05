import { megio } from '@/megio-sdk'
import type { IResponse } from '@/megio-sdk/types/IResponse'
import type { IRemoveParams } from '@/megio-sdk/collections/types/IRemoveParams'

export interface IResp extends IResponse {
    data: {
        message: string
    }
}

const remove = async (params: IRemoveParams): Promise<IResp> => {
    const resp = await megio.fetch(`saas/collections/delete`, {
        method: 'DELETE',
        body: JSON.stringify(params)
    })

    return { ...resp, data: resp.data }
}

export default remove