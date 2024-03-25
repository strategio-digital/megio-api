import { megio } from './../../index.ts'
import type { IRespReadAll, IReadAllParams } from '../types'

const readAllCrud = async (params: IReadAllParams): Promise<IRespReadAll> => {
    const resp = await megio.fetch(`megio/collections/read-all`, {
        method: 'POST',
        body: JSON.stringify(params)
    })

    return { ...resp, data: resp.data }
}

export default readAllCrud