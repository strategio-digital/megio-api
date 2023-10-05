import type { ISchemaProp } from '@/collections/types/ISchemaProp'

export interface ISchema {
    meta: {
        table: string,
        invisible: string[]
    }
    props: ISchemaProp[]
}