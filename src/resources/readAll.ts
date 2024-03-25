import { megio } from './../index.ts'
import type { IRespShow } from './types'

const readAll = async (viewResources: string[] | null = null, makeViewDiff: boolean = true): Promise<IRespShow> => {
    const resp = await megio.fetch(`megio/resources/show`, {
        method: 'POST',
        body: JSON.stringify({
            view_resources: viewResources,
            make_view_diff: makeViewDiff
        })
    })
    return { ...resp, data: resp.data }
}

export default readAll