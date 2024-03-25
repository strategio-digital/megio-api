import { ICreateFormParams, IRespCreateForm } from '../types'
import { megio } from '../../index.ts'

const creatingForm = async (params: ICreateFormParams): Promise<IRespCreateForm> => {
    const resp = await megio.fetch(`megio/collections/form/creating`, {
        method: 'POST',
        body: JSON.stringify(params)
    })

    return { ...resp, data: resp.data }
}

export default creatingForm