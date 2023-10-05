import { megio } from '@/megio-sdk'
import type { IResponse } from '@/megio-sdk/types/IResponse'
import type { IShowParams } from '@/megio-sdk/collections/types/IShowParams'
import type { IRow } from '@/megio-sdk/collections/types/IRow'
import type { IPagination } from '@/megio-sdk/collections/types/IPagination'
import type { ISchema } from '@/megio-sdk/collections/types/ISchema'

export interface IResp extends IResponse {
    data: {
        pagination: IPagination
        items: IRow[]
        schema?: ISchema
    }
}

const show = async (params: IShowParams): Promise<IResp> => {
    const resp = await megio.fetch(`saas/collections/show`, {
        method: 'POST',
        body: JSON.stringify(params)
    })

    return { ...resp, data: resp.data }
}

export default show