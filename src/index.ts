import loginByEmail from './auth/loginByEmail'
import logout from './auth/logout'
import user from './auth/user'

import createCrud from './collections/crud/createCrud'
import updateCrud from './collections/crud/updateCrud'
import readAllCrud from './collections/crud/readAllCrud'
import readCrud from './collections/crud/readCrud'
import deleteCrud from './collections/crud/deleteCrud'

import creatingForm from './collections/form/creatingForm'
import updatingForm from './collections/form/updatingForm'
import navbar from './collections/meta/navbar'

import revokeToken from './auth/revokeToken'
import updateResources from './resources/update'

import readAllResources from './resources/readAll'
import createRole from './resources/createRole'
import updateRole from './resources/updateRole'

import deleteRole from './resources/deleteRole'
import { IResponse, IStorage } from './types'

const storage: IStorage = {
    getItem: (key: string) => localStorage.getItem(key),
    setItem: (key: string, value: string) => localStorage.setItem(key, value),
    removeItem: (key: string) => localStorage.removeItem(key)
}

const props = {
    baseUrl: 'http://localhost:8090/',
    errorHandler: function (response: Response, errors: string[]) {
        console.error(response.status, errors)
    },
    storage
}

export function getStorage() {
    return props.storage
}

export function setup(baseUrl: string, errorHandler: (response: Response, errors: string[]) => void, storage: IStorage | null = null) {
    props.baseUrl = baseUrl
    props.errorHandler = errorHandler
    if (storage !== null) {
        props.storage = storage
    }
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
        status: response.status,
        success: response.ok,
        data: json,
        errors: json.errors ? json.errors : []
    }
}

export const megio = {
    fetch: fetchApi,
    collections: {
        create: createCrud,
        update: updateCrud,
        read: readCrud,
        readAll: readAllCrud,
        delete: deleteCrud,
    },
    collectionsExtra: {
        navbar,
        creatingForm,
        updatingForm
    },
    auth: {
        user,
        loginByEmail,
        logout,
        revokeToken
    },
    resources: {
        readAll: readAllResources,
        update: updateResources,
        createRole,
        updateRole,
        deleteRole
    }
}