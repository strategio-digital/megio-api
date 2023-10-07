import { megio } from './../index.ts'
import type { IRespUpdate } from './types'

const update = async (viewResources: string[]): Promise<IRespUpdate> => {
    const resp = await megio.fetch(`megio/resources/update`, {
        method: 'POST',
        body: JSON.stringify({
            view_resources: viewResources,
            make_view_diff: true
        })
    })

    return { ...resp, data: resp.data }
}

export default update