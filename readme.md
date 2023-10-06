# Megio SDK

## Installation

`yarn add megio-sdk`

## Usage

### Setup

```typescript
import { setup } from 'megio-sdk'

export function createMegioSdk() {
    // Override default end-point
    setup('http://localhost:8090/', errorHandler)

    // Override default non-200 status handler
    function errorHandler(response: Response, errors: string[]) {
        console.log(response.status, errors)
    }
}
```

### API call example

```typescript
import { megio } from 'megio-sdk'

// User login
const resp = await megio.auth.loginByEmail('jz@strategio.dev', 'Test1234', 'user')
console.log(resp)
```

### All API end-points

```typescript
import { megio } from 'megio-sdk'

// Fetch
const resp = await megio.fetch(uri, json)

// Auth
const resp = await megio.auth.currentUser(...params)
const resp = await megio.auth.loginByEmail(...params)
const resp = await megio.auth.logout(...params)
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