import { megio } from './../../index.ts'
import type { IRespShow, IShowParams } from '../types'


const show = async (params: IShowParams): Promise<IRespShow> => {
    const resp = await megio.fetch(`megio/collections/show`, {
        method: 'POST',
        body: JSON.stringify(params)
    })

    return { ...resp, data: resp.data }
}

export default show