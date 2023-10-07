import { megio } from './../index.ts'
import type { IRespRevokeToken } from './types'

const revokeToken = async (user_ids: string[], source: string): Promise<IRespRevokeToken> => {
    const resp = await megio.fetch(`saas/auth/revoke-token`, {
        method: 'POST',
        body: JSON.stringify({ source, user_ids })
    })

    return { ...resp, data: resp.data }
}

export default revokeToken