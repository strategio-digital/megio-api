import type { IResource } from '@/resources/types/IResource'
import type { IRole } from '@/resources/types/IRole'

export interface IGroupedResourcesWithRoles {
    groupName: string,
    resources: Array<IResource & {
        roles: IRole[],
    }>,
}