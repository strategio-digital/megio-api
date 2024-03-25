import { megio } from './../../index.ts'
import type { IRespNavbar } from '../types'

const navbar = async (): Promise<IRespNavbar> => {
    const resp = await megio.fetch(`megio/collections/navbar`, { method: 'POST' })
    return { ...resp, data: resp.data }
}

export default navbar