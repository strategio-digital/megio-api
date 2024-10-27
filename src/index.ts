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
import { IResponse, IStorage, IUploadStats } from './types'

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
    const headers: Record<string, any> = {
        'Content-Type': 'application/json',
        ...options?.headers
    }

    if (headers['Content-Type'] === 'none') {
        delete headers['Content-Type']
    }

    const info: RequestInit = {
        ...options,
        headers
    }

    const currentUser = user.get()

    if (currentUser) {
        info.headers = {
            ...info.headers,
            'Authorization': `Bearer ${currentUser.bearer_token}`
        }
    }

    const response = await fetch(props.baseUrl + uri, info)
    let json = null

    try {
        json = await response.json()
    } catch (e) {
    }

    const statusText = response.statusText !== ''
        ? response.statusText :
        `Error ${response.status} (no status text)`

    if (response.status < 200 || response.status > 299) {
        props.errorHandler(response, json ? json.errors : [statusText])
    }

    const errors = json ? json.errors : [statusText]

    return {
        status: response.status,
        success: response.ok,
        data: json,
        errors: errors ? errors : []
    }
}

async function upload(
    uri: string,
    formData: FormData,
    onProgress: (stats: IUploadStats) => void
): Promise<IResponse> {
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest()

        xhr.upload.onprogress = (event: ProgressEvent) => {
            if (event.lengthComputable) {
                const percentComplete = (event.loaded / event.total) * 100
                onProgress({
                    percent: percentComplete,
                    loaded: event.loaded,
                    total: event.total
                })
            }
        }

        xhr.onload = async () => {
            const response = xhrToResponse(xhr)
            let json = null

            try {
                json = await response.json()
            } catch (e) {
            }

            const statusText = response.statusText !== ''
                ? response.statusText :
                `Error ${response.status} (no status text)`

            if (response.status < 200 || response.status > 299) {
                props.errorHandler(response, json ? json.errors : [statusText])
            }

            const errors = json ? json.errors : [statusText]

            return resolve({
                status: response.status,
                success: response.ok,
                data: json,
                errors: errors ? errors : []
            })
        }

        xhr.onerror = () => {
            return resolve({
                status: xhr.status,
                success: false,
                errors: [xhr.responseText]
            })
        }

        xhr.open('POST', uri)

        const currentUser = user.get()

        if (currentUser) {
            xhr.setRequestHeader('Authorization', `Bearer ${currentUser.bearer_token}`)
        }

        xhr.send(formData)
    })
}

function xhrToResponse(xhr: XMLHttpRequest): Response {
    const headers = new Headers()
    const allHeaders = xhr.getAllResponseHeaders()

    allHeaders.trim().split(/[\r\n]+/).forEach((line) => {
        const parts = line.split(': ')
        const header = parts.shift()
        const value = parts.join(': ')
        if (header) {
            headers.append(header, value)
        }
    })

    const body = xhr.responseText

    return new Response(body, {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: headers
    })
}

export const megio = {
    fetch: fetchApi,
    upload,
    collections: {
        create: createCrud,
        update: updateCrud,
        read: readCrud,
        readAll: readAllCrud,
        delete: deleteCrud
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