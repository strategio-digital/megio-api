import { megio } from './../index.ts'
import type { IResponse } from './../types/IResponse'
import type { IRole } from './types/IRole'

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