import loginByEmail from './auth/loginByEmail'
import logout from './auth/logout'
import user from './auth/user'
import show from './collections/crud/show'
import showOne from './collections/crud/showOne'
import remove from './collections/crud/remove'
import revokeToken from './auth/revokeToken'
import navbar from './collections/meta/navbar'
import showResources from './resources/show'
import updateResources from './resources/update'
import updateRole from './resources/updateRole'
import removeRole from './resources/removeRole'
import createRole from './resources/createRole'
import { IResponse } from './types'

const props = {
    baseUrl: 'http://localhost:8090/',
    errorHandler: function (response: Response, errors: string[]) { console.error(response.status, errors) }
}

export function setup(baseUrl: string, errorHandler: (response: Response, errors: string[]) => void) {
    props.baseUrl = baseUrl
    props.errorHandler = errorHandler
}

async function fetchApi(uri: string, options: RequestInit): Promise<IResponse> {
    const info: RequestInit = {
        ...options,
        headers: {
            ...options?.headers,
            'Content-Type': 'application/json'
        }
    }

    const currentUser = user.get()

    if (currentUser) {
        info.headers = { ...info.headers, 'Authorization': `Bearer ${currentUser.bearer_token}` }
    }

    const response = await fetch(props.baseUrl + uri, info)
    const json = await response.json()

    if (response.status < 200 || response.status > 299) {
        props.errorHandler(response, json.errors)
    }

    return {
        success: response.ok,
        data: json,
        errors: json.errors ? json.errors : []
    }
}

export const megio = {
    fetch: fetchApi,
    collections: {
        show,
        showOne,
        remove,
        navbar
    },
    auth: {
        user,
        loginByEmail,
        logout,
        revokeToken
    },
    resources: {
        show: showResources,
        update: updateResources,
        createRole,
        updateRole,
        removeRole
    }
}