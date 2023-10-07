import { megio } from './../index.ts'
import type { IRespShow } from './types'

const show = async (viewResources: string[] | null = null): Promise<IRespShow> => {
    const resp = await megio.fetch(`megio/resources/show`, {
        method: 'POST',
        body: JSON.stringify({
            view_resources: viewResources,
            make_view_diff: true
        })
    })
    return { ...resp, data: resp.data }
}

export default show