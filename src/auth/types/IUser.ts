import type { IRow } from './../../collections/types/IRow.ts'

export interface IUser extends IRow {
    email: string
    role: string
}