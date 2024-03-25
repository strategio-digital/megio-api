import type { IAuthUser } from './types'
import { getStorage } from '../index'

const currentUser = (): IAuthUser | null => {
    const data = getStorage().getItem('megio_user')
    return data ? JSON.parse(data) : null
}

const currentUserResources = (): string[] => {
    const user = currentUser()
    return user?.user.resources || []
}

const currentUserRoles = () => {
    const user = currentUser()
    return user?.user.roles || []
}

const hasRole = (role: string): boolean => {
    return currentUserRoles().includes(role)
}

const hasResource = (resource: string): boolean => {
    if (currentUserRoles().includes('admin')) {
        return true
    }

    return currentUserResources().includes(resource)
}

const hasAllOfResources = (resources: string[]): boolean => {
    return resources.every(resource => hasResource(resource))
}

const hasAnyOfResources = (resources: string[]): boolean => {
    return resources.some(resource => hasResource(resource))
}

export default {
    get: currentUser,
    getResources: currentUserResources,
    getRoles: currentUserRoles,
    hasRole,
    hasResource,
    hasAllOfResources,
    hasAnyOfResources
}