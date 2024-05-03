import { IResponse } from '../../types'

export interface IRow {
    id: string,

    [key: string]: any
}

export interface IColumnSchema {
    meta: {
        recipe: string
    }
    props: IColumnProp[],
    search?: {
        searchables: ISearchable[]
    }
}

export interface IOrderBy {
    col: string
    desc: boolean
}

export interface ISearch {
    text: string
}

export interface IPagination {
    currentPage: number
    lastPage: number
    itemsPerPage: number
    itemsCountAll: number
}

export interface IColumnProp {
    renderer: string
    key: string,
    name: string,
    sortable: boolean,
    visible: boolean,
    formatters: string[] // class-names
}

export interface ISearchable {
    column: string
    relation: string | null
}

export interface IRespNavbar extends IResponse {
    data: {
        items: string[]
    }
}

export interface ICreateParams {
    recipe: string
    rows: Omit<IRow, 'id'>[]
}

export interface IRespCreate extends IResponse {
    data: {
        ids?: IRow['id'][],
        message?: string,
        validation_errors?: {
            [key: string]: string[];
            '@': string[]
        }
    }
}

export interface IUpdateParams {
    recipe: string
    rows: Array<{
        id: IRow['id'],
        data: Omit<IRow, 'id'>
    }>
}

export interface IRespUpdate extends IRespCreate {

}

export interface IReadParams {
    recipe: string
    id: IRow['id']
    schema?: boolean
    adminPanel?: boolean
}

export interface IRespRead extends IResponse {
    data: IRow | any,
    schema?: IColumnSchema
}

export interface IReadAllParams {
    recipe: string,
    currentPage: number
    itemsPerPage: number
    orderBy?: IOrderBy[]
    search?: ISearch
    schema?: boolean,
    adminPanel?: boolean
}

export interface IRespReadAll extends IResponse {
    data: {
        pagination: IPagination
        items: IRow[]
        schema?: IColumnSchema
    }
}

export interface IDeleteParams {
    recipe: string
    ids: IRow['id'][]
}

export interface IRespDelete extends IResponse {
    data: {
        message: string
    }
}

export interface ICreateFormParams {
    recipe: string
}

export interface IRespCreateForm extends IResponse {
    data: {
        form: IFormProp[]
    }
}

export interface IUpdateFormParams {
    recipe: string,
    id: IRow['id']
}

export interface IRespUpdateForm extends IRespCreateForm {

}

export interface IFormProp {
    renderer: string
    disabled: boolean
    name: string
    label: string
    rules: IFormRule[]
    serializers: string[] // class-names
    attrs: {
        [key: string]: any
    },
    params: {
        [key: string]: any
    },
    value: any,
    default_value: any,
    errors: string[]
}

export interface IFormRule {
    name: string
    message: string
    params: {
        [key: string]: any
    }
}