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