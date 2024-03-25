import { IRespUpdateForm, IUpdateFormParams } from '../types'
import { megio } from '../../index.ts'

const updatingForm = async (params: IUpdateFormParams): Promise<IRespUpdateForm> => {
    const resp = await megio.fetch(`megio/collections/form/updating`, {
        method: 'PATCH',
        body: JSON.stringify(params)
    })

    return { ...resp, data: resp.data }
}

export default updatingForm