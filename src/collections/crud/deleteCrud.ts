import { megio } from './../../index.ts'
import type { IDeleteParams, IRespDelete } from '../types'

const deleteCrud = async (params: IDeleteParams): Promise<IRespDelete> => {
    const resp = await megio.fetch(`megio/collections/delete`, {
        method: 'DELETE',
        body: JSON.stringify(params)
    })

    return { ...resp, data: resp.data }
}

export default deleteCrud