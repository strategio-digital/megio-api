import loginByEmail from '@/megio-sdk/auth/loginByEmail'
import logout from '@/megio-sdk/auth/logout'
import currentUser from '@/megio-sdk/auth/currentUser'
import show from '@/megio-sdk/collections/crud/show'
import showOne from '@/megio-sdk/collections/crud/showOne'
import remove from '@/megio-sdk/collections/crud/remove'
import revokeToken from '@/megio-sdk/auth/revokeToken'
import navbar from '@/megio-sdk/collections/meta/navbar'
import showResources from '@/megio-sdk/resources/show'
import updateResources from '@/megio-sdk/resources/update'
import updateRole from '@/megio-sdk/resources/updateRole'
import removeRole from '@/megio-sdk/resources/removeRole'
import createRole from '@/megio-sdk/resources/createRole'
import type { IResponse } from '@/megio-sdk/types/IResponse'

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

    const user = currentUser()

    if (user) {
        info.headers = { ...info.headers, 'Authorization': `Bearer ${user.bearer_token}` }
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
        currentUser,
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