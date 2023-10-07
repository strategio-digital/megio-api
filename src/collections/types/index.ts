import { IResponse } from '../../types'

export interface IOrderBy {
    col: string
    desc: boolean
}

export interface IPagination {
    currentPage: number
    lastPage: number
    itemsPerPage: number
    itemsCountAll: number
}

export interface IRemoveParams {
    table: string
    ids: string[]
}

export interface IRow {
    id: string,
    [key: string]: any
}

export interface ISchema {
    meta: {
        table: string,
        invisible: string[]
    }
    props: ISchemaProp[]
}

export interface ISchemaProp {
    name: string
    nullable: boolean
    maxLength: null | number
    type:
        'guid' | //  Type that maps a database GUID/UUID to a PHP string. Defaults to varchar but uses a specific type if the platform supports it.
        'string' | //Type that maps a SQL VARCHAR to a PHP string.
        'text' | //  Type that maps a SQL CLOB to a PHP string.

        'boolean' | //  Type that maps a SQL boolean or equivalent (TINYINT) to a PHP boolean.

        'bigint' | //  Type that maps a database BIGINT to a PHP string.
        'decimal' | //  Type that maps a SQL DECIMAL to a PHP string.

        'integer' | // Type that maps a SQL INT to a PHP integer.
        'smallint' | // Type that maps a database SMALLINT to a PHP integer.
        'float' | //  Type that maps a SQL Float (Double Precision) to a PHP double. IMPORTANT: Works only with locale settings that use decimal points as separator.

        'date' | //  Type that maps a SQL DATETIME to a PHP DateTime object.
        'time' | //  Type that maps a SQL TIME to a PHP DateTime object.
        'datetime' | //  Type that maps a SQL DATETIME/TIMESTAMP to a PHP DateTime object.
        'datetimetz' | //  Type that maps a SQL DATETIME/TIMESTAMP to a PHP DateTime object with timezone.

        'object' | //  Type that maps a SQL CLOB to a PHP object using serialize() and unserialize()
        'array' | //  Type that maps a SQL CLOB to a PHP array using serialize() and unserialize()
        'simple_array' | //  Type that maps a SQL CLOB to a PHP array using implode() and explode(), with a comma as delimiter. IMPORTANT Only use this type if you are sure that your values cannot contain a ",".
        'json_array' | //  Type that maps a SQL CLOB to a PHP array using json_encode() and json_decode()
        'json' |

        'blob' | //  Type that maps a SQL BLOB to a PHP resource stream
        '@unknown' // Not recognized by our CrudHelper class
}

export interface IShowOneParams {
    table: string
    id: string
    schema?: boolean
}

export interface IShowParams {
    table: string,
    currentPage: number
    itemsPerPage: number
    schema?: boolean
    orderBy?: IOrderBy[]
}

export interface IRespRemove extends IResponse {
    data: {
        message: string
    }
}

export interface IRespShow extends IResponse {
    data: {
        pagination: IPagination
        items: IRow[]
        schema?: ISchema
    }
}

export interface IRespShowOne extends IResponse {
    data: IRow | any,
    schema?: ISchema
}

export interface IRespNavbar extends IResponse {
    data: {
        items: string[]
    }
}