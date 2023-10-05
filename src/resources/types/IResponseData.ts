import type { IRole } from '@/resources/types/IRole'
import type { IResource } from '@/resources/types/IResource'
import type { IGroupedResourcesWithRoles } from '@/resources/types/IGroupedResourcesWithRoles'
import type { IResourceDiff } from '@/resources/types/IResourceDiff'

export interface IResponseData {
    roles: IRole[],
    resources: IResource[],
    grouped_resources_with_roles: IGroupedResourcesWithRoles[],
    resources_diff: IResourceDiff
}