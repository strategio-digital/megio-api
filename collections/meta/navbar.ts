import { megio } from '@/megio-sdk'
import type { IResponse } from '@/megio-sdk/types/IResponse'

export interface IResp extends IResponse {
    data: {
        items: string[]
    }
}

const navbar = async (): Promise<IResp> => {
    const resp = await megio.fetch(`saas/collections/navbar`, { method: 'POST' })
    return { ...resp, data: resp.data }
}

export default navbar