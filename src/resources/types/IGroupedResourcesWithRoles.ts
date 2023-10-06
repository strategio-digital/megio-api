import type { IResource } from './IResource'
import type { IRole } from './IRole'

export interface IGroupedResourcesWithRoles {
    groupName: string,
    resources: Array<IResource & {
        roles: IRole[],
    }>,
}