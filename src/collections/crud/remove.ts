import { megio } from './../../index.ts'
import type { IRemoveParams, IRespRemove } from '../types'

const remove = async (params: IRemoveParams): Promise<IRespRemove> => {
    const resp = await megio.fetch(`saas/collections/delete`, {
        method: 'DELETE',
        body: JSON.stringify(params)
    })

    return { ...resp, data: resp.data }
}

export default remove