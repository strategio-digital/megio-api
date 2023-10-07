import { IResponse } from './IResponse.ts'
import { IAuthUser } from '../auth/types/IAuthUser.ts'

export interface IRespLoginByEmail extends IResponse {
    data: IAuthUser
}
