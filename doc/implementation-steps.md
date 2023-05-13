# Implementation Steps

### Install msw  
```
npm install msw --save-dev
```

### Install types for events (if needed)
```
npm install @types/events --save-dev 
```

### Initialize msw 
```
npx msw init ./src --save
```

### Add to assets
```
"assets": [
  "src/favicon.ico",
  "src/assets", 
  "src/mockServiceWorker.js"
],
```

### Create files  
```
mkdir src/mocks  
touch src/mocks/browser.ts
touch src/mocks/handlers.ts
```

### Create an empty handlers array in src/mocks/handlers.ts
```
import { rest } from 'msw'

export const handlers = [

]
```

### Fill in browser.ts
```
import { setupWorker } from 'msw'
import { handlers } from './handlers'

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers)
```

### Start the worker in development build
Add the following to the top of src/environments/environment.development.ts
```
import { worker } from "src/mocks/browser";

worker.start();
```

### Verify that it's working

### Implement vote-count route in handlers.ts
```
  rest.get('/vote-count', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        voteCount: 1
      })
    )
  }),

  rest.post('/vote', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 'abc123',
        agreeCount: 20,
      })
    )
  }),

```
