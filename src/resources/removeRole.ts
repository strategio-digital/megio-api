import { megio } from './../index.ts'
import type { IResponse } from './../types/IResponse'

export interface IResp extends IResponse {
    data: {
        message: string
    }
}

const removeRole = async (roleId: string): Promise<IResp> => {
    const resp = await megio.fetch(`saas/resources/delete-role`, {
        method: 'DELETE',
        body: JSON.stringify({ id: roleId })
    })

    return { ...resp, data: resp.data }
}

export default removeRole