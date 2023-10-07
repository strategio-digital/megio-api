import { megio } from './../index.ts'
import type { IRespCreateRole } from './types'

const createRole = async (name: string): Promise<IRespCreateRole> => {
    const resp = await megio.fetch(`saas/resources/create-role`, {
        method: 'POST',
        body: JSON.stringify({ name })
    })

    return { ...resp, data: resp.data }
}

export default createRole