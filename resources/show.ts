import { megio } from '@/megio-sdk'
import type { IResponse } from '@/megio-sdk/types/IResponse'
import type { IResponseData } from '@/megio-sdk/resources/types/IResponseData'

export interface IResp extends IResponse {
    data: IResponseData
}

const show = async (viewResources: string[] | null = null): Promise<IResp> => {
    const resp = await megio.fetch(`saas/resources/show`, {
        method: 'POST',
        body: JSON.stringify({
            view_resources: viewResources,
            make_view_diff: true
        })
    })
    return { ...resp, data: resp.data }
}

export default show