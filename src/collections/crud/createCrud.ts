import { megio } from './../../index.ts'
import { ICreateParams, IRespCreate } from '../types'

const createCrud = async (params: ICreateParams): Promise<IRespCreate> => {
    const resp = await megio.fetch(`megio/collections/create`, {
        method: 'POST',
        body: JSON.stringify(params)
    })

    return { ...resp, data: resp.data }
}

export default createCrud