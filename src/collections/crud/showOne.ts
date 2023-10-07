import { megio } from './../../index.ts'
import type { IRespShowOne, IShowOneParams } from '../types'

const showOne = async (params: IShowOneParams): Promise<IRespShowOne> => {
    const resp = await megio.fetch(`megio/collections/show-one`, {
        method: 'POST',
        body: JSON.stringify(params)
    })

    return { ...resp, data: resp.data }
}

export default showOne