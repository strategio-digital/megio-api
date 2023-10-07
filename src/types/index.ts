export interface IDateTime {
    date: string
    timezone: string
    timezone_type: number
}

export interface IResponse {
    data?: any
    success: boolean
    errors: string[]
}