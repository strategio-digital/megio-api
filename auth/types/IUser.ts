import type { IRow } from '@/megio-sdk/collections/types/IRow'

export interface IUser extends IRow {
    email: string
    role: string
}