import { megio } from '@/index.ts'
import type { IResponse } from '@/types/IResponse'

export interface IResp extends IResponse {
    data: {
        message: string
    }
}

const revokeToken = async (user_ids: string[], source: string): Promise<IResp> => {
    const resp = await megio.fetch(`saas/auth/revoke-token`, {
        method: 'POST',
        body: JSON.stringify({ source, user_ids })
    })

    return { ...resp, data: resp.data }
}

export default revokeToken