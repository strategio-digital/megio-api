import type { IResponse } from '../../types'
import type { IRow } from '../../collections/types'

export interface IAuthUser {
    bearer_token: string
    bearer_token_id: string
    user: {
        id: string
        email: string
        roles: string[]
        resources: string[]
    }
}

export interface IUser extends IRow {
    email: string
    role: string
}

export interface IRespLoginByEmail extends IResponse {
    data: IAuthUser
}

export interface IRespRevokeToken extends IResponse {
    data: {
        message: string
    }
}