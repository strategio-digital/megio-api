import { megio } from '@/index.ts'
import type { IResponse } from '@/types/IResponse'
import type { IShowParams } from '@/collections/types/IShowParams'
import type { IRow } from '@/collections/types/IRow'
import type { IPagination } from '@/collections/types/IPagination'
import type { ISchema } from '@/collections/types/ISchema'

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