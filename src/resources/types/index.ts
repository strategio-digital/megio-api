import { IResponse } from '../../types'

export interface IGroupedResourcesWithRoles {
    groupName: string,
    resources: Array<IResource & {
        roles: IRole[],
    }>,
}

export interface IResource {
    id: string
    name: string
    type: string
    hint?: string
}

export interface IResourceDiff {
    to_create: string[],
    to_remove: string[]
}

export interface IResponseData {
    roles: IRole[],
    resources: IResource[],
    grouped_resources_with_roles: IGroupedResourcesWithRoles[],
    resources_diff: IResourceDiff
}

export interface IRole {
    id: string
    name: string
    enabled?: boolean
}

export interface IRespCreateRole extends IResponse {
    data: IRole
}

export interface IRespUpdateRole extends IResponse {
    data: {
        message: string
    }
}

export interface IRespDeleteRole extends IResponse {
    data: {
        message: string
    }
}

export interface IRespShow extends IResponse {
    data: IResponseData
}

export interface IRespUpdate extends IResponse {
    data: IResponseData
}