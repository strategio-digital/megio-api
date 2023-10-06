import type { IRole } from './IRole'
import type { IResource } from './IResource'
import type { IGroupedResourcesWithRoles } from './IGroupedResourcesWithRoles'
import type { IResourceDiff } from './IResourceDiff'

export interface IResponseData {
    roles: IRole[],
    resources: IResource[],
    grouped_resources_with_roles: IGroupedResourcesWithRoles[],
    resources_diff: IResourceDiff
}