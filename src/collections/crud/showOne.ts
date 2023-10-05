import { megio } from '@/megio-sdk'
import type { IResponse } from '@/megio-sdk/types/IResponse'
import type { IShowOneParams } from '@/megio-sdk/collections/types/IShowOneParams'
import type { IRow } from '@/megio-sdk/collections/types/IRow'
import type { ISchema } from '@/megio-sdk/collections/types/ISchema'

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