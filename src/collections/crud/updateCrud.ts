import { megio } from './../../index.ts'
import { IRespUpdate, IUpdateParams } from '../types'

const createCrud = async (params: IUpdateParams): Promise<IRespUpdate> => {
    const resp = await megio.fetch(`megio/collections/update`, {
        method: 'PATCH',
        body: JSON.stringify(params)
    })

    return { ...resp, data: resp.data }
}

export default createCrud