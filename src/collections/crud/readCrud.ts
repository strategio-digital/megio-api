import { megio } from './../../index.ts'
import type { IRespRead, IReadParams } from '../types'

const readCrud = async (params: IReadParams): Promise<IRespRead> => {
    const resp = await megio.fetch(`megio/collections/read`, {
        method: 'POST',
        body: JSON.stringify(params)
    })

    return { ...resp, data: resp.data }
}

export default readCrud