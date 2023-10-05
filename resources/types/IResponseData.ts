import type { IRole } from '@/megio-sdk/resources/types/IRole'
import type { IResource } from '@/megio-sdk/resources/types/IResource'
import type { IGroupedResourcesWithRoles } from '@/megio-sdk/resources/types/IGroupedResourcesWithRoles'
import type { IResourceDiff } from '@/megio-sdk/resources/types/IResourceDiff'

export interface IResponseData {
    roles: IRole[],
    resources: IResource[],
    grouped_resources_with_roles: IGroupedResourcesWithRoles[],
    resources_diff: IResourceDiff
}