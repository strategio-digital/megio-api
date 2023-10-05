import type { IResource } from '@/megio-sdk/resources/types/IResource'
import type { IRole } from '@/megio-sdk/resources/types/IRole'

export interface IGroupedResourcesWithRoles {
    groupName: string,
    resources: Array<IResource & {
        roles: IRole[],
    }>,
}