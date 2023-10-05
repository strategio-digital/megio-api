import type { ISchemaProp } from '@/megio-sdk/collections/types/ISchemaProp'

export interface ISchema {
    meta: {
        table: string,
        invisible: string[]
    }
    props: ISchemaProp[]
}