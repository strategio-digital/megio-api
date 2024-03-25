# Megio API SDK

JavaScript & TypeScript SDK (Software Development Kit) for calling Megio APIs.

## Installation

`yarn add megio-api`


## Setup

```typescript
import { setup } from 'megio-api'

// Override default end-point
setup('http://localhost:8090/', errorHandler)

// Override default non-200 status handler
function errorHandler(response: Response, errors: string[]) {
    console.log(response.status, errors)
}
```

## API call example

```typescript
import { megio } from 'megio-api'

// User login
const resp = await megio.auth.loginByEmail('jz@strategio.dev', 'Test1234', 'user')
console.log(resp)
```

## Megio end-points

```typescript
import { megio } from 'megio-api'

// Fetch custom end-point
const resp = await megio.fetch(customUri, customJsonBody)

// Auth
const resp = await megio.auth.loginByEmail(...params)
const resp = await megio.auth.revokeToken(...params)

// Collections
const resp = await megio.collections.create(...params)
const resp = await megio.collections.update(...params)
const resp = await megio.collections.read(...params)
const resp = await megio.collections.readAll(...params)
const resp = await megio.collections.delete(...params)

// Collections extra
const resp = await megio.collectionsExtra.navbar(...params)
const resp = await megio.collectionsExtra.creatingForm(...params)
const resp = await megio.collectionsExtra.updatingForm(...params)

// Resources
const resp = await megio.resources.readAll(...params)
const resp = await megio.resources.update(...params)
const resp = await megio.resources.createRole(...params)
const resp = await megio.resources.updateRole(...params)
const resp = await megio.resources.removeRole(...params)
```

## Working with user
```typescript
// User
megio.auth.logout() // logout current user
megio.auth.user.get() // get current user

// Permissions
megio.auth.user.getResources()
megio.auth.user.getRoles()
megio.auth.user.hasRole('role')
megio.auth.user.hasResource('res-x')
megio.auth.user.hasAllOfResources(['res-x', 'res-y'])
megio.auth.user.hasAnyOfResources(['res-x', 'res-y'])
```

## Working with types
```typescript
import type { ... } from 'megio-api/types'
import type { ... } from 'megio-api/types/auth'
import type { ... } from 'megio-api/types/resources'
import type { ... } from 'megio-api/types/collections'
```