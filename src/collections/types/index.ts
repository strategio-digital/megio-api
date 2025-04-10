import { IRecipe, IResponse } from '../../types'

export interface IRow {
    id: string,

    [key: string]: any
}

export interface IColumnSchema {
    recipe: IRecipe,
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
    orderBy: IOrderBy[]
}

export interface IColumnProp {
    renderer: string
    key: string,
    name: string,
    sortable: boolean,
    visible: boolean,
    formatters: string[], // class-names
    orderBy: IOrderBy[]
}

export interface ISearchable {
    column: string
    relation: string | null
}

export interface IRespNavbar extends IResponse {
    data: {
        items: IRecipe[]
    }
}

export interface ICreateParams {
    recipeKey: string
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
    recipeKey: string
    rows: Array<{
        id: IRow['id'],
        data: Omit<IRow, 'id'>
    }>
}

export interface IRespUpdate extends IRespCreate {

}

export interface IReadParams {
    recipeKey: string
    id: IRow['id']
    schema?: boolean
    adminPanel?: boolean
}

export interface IRespRead extends IResponse {
    data: IRow | any,
    schema?: IColumnSchema
}

export interface IReadAllParams {
    recipeKey: string,
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
    recipeKey: string
    ids: IRow['id'][]
}

export interface IRespDelete extends IResponse {
    data: {
        message: string
    }
}

export interface ICreateFormParams {
    recipeKey: string
}

export interface IRespCreateForm extends IResponse {
    data: {
        recipe: IRecipe
        form: IFormProp[]
    }
}

export interface IUpdateFormParams {
    recipeKey: string,
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