import { megio } from '@/index.ts'
import type { IResponse } from '@/types/IResponse'
import type { IResponseData } from '@/resources/types/IResponseData'

export interface IResp extends IResponse {
    data: IResponseData
}

const update = async (viewResources: string[]): Promise<IResp> => {
    const resp = await megio.fetch(`saas/resources/update`, {
        method: 'POST',
        body: JSON.stringify({
            view_resources: viewResources,
            make_view_diff: true
        })
    })

    return { ...resp, data: resp.data }
}

export default update