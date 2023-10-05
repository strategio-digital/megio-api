import { megio } from '@/megio-sdk'
import type { IResponse } from '@/megio-sdk/types/IResponse'
import type { IAuthUser } from '@/megio-sdk/auth/types/IAuthUser'

export interface IResp extends IResponse {
    data: IAuthUser
}

const loginByEmail = async (email: string, password: string, source: string): Promise<IResp> => {
    const resp = await megio.fetch('saas/auth/email', {
        method: 'POST',
        body: JSON.stringify({ source, email, password })
    })

    if (resp.success && (resp.data.user.roles.includes('admin') || resp.data.user.resources.length !== 0)) {
        localStorage.setItem('strategio_saas_user', JSON.stringify(resp.data))
    }

    return { ...resp, data: resp.data }
}

export default loginByEmail