import { megio } from './../../index.ts'
import type { IResponse } from './../../types/IResponse'
import type { IShowOneParams } from './../types/IShowOneParams'
import type { IRow } from './../types/IRow'
import type { ISchema } from './../types/ISchema'

export interface IResp extends IResponse {
    data: IRow | any,
    schema?: ISchema
}

const showOne = async (params: IShowOneParams): Promise<IResp> => {
    const resp = await megio.fetch(`saas/collections/show-one`, {
        method: 'POST',
        body: JSON.stringify(params)
    })

    return { ...resp, data: resp.data }
}

export default showOne