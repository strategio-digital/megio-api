import { megio } from './../index.ts'
import type { IRespLoginByEmail } from './types'

const loginByEmail = async (email: string, password: string, source: string): Promise<IRespLoginByEmail> => {
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