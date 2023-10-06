import type { ISchemaProp } from './ISchemaProp'

export interface ISchema {
    meta: {
        table: string,
        invisible: string[]
    }
    props: ISchemaProp[]
}