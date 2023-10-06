# Megio SDK

JavaScript & TypeScript toolkit for calling Megio APIs.

## Installation

`yarn add megio-sdk`


## Setup

```typescript
import { setup } from 'megio-sdk'

// Override default end-point
setup('http://localhost:8090/', errorHandler)

// Override default non-200 status handler
function errorHandler(response: Response, errors: string[]) {
    console.log(response.status, errors)
}
```

## API call example

```typescript
import { megio } from 'megio-sdk'

// User login
const resp = await megio.auth.loginByEmail('jz@strategio.dev', 'Test1234', 'user')
console.log(resp)
```

## All end-points

```typescript
import { megio } from 'megio-sdk'

// Fetch
const resp = await megio.fetch(uri, json)

// User
const user = megio.auth.user.get() // get current user
megio.auth.logout() // logout current user

// Auth
const resp = await megio.auth.loginByEmail(...params)
const resp = await megio.auth.revokeToken(...params)

// Collections
const resp = await megio.collections.show(...params)
const resp = await megio.collections.showOne(...params)
const resp = await megio.collections.remove(...params)
const resp = await megio.collections.navbar(...params)

// Resources
const resp = await megio.resources.show(...params)
const resp = await megio.resources.update(...params)
const resp = await megio.resources.createRole(...params)
const resp = await megio.resources.updateRole(...params)
const resp = await megio.resources.removeRole(...params)
```

## Working with user permissions
```typescript
megio.auth.user.get()
megio.auth.user.getResources()
megio.auth.user.getRoles()
megio.auth.user.hasRole('role')
megio.auth.user.hasResource('res-x')
megio.auth.user.hasAllOfResources(['res-x', 'res-y'])
megio.auth.user.hasAnyOfResources(['res-x', 'res-y'])
```