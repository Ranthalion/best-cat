# Add Mock Service Worker

1. Install MSW
1. Configure the app to use MSW in DEV
1. Implement mock api routes (handlers)

### Install msw  
```bash
npm install msw --save-dev
```

### Initialize msw 
```bash
npx msw init ./src --save
```

### Add to assets
```ts
"assets": [
  "src/favicon.ico",
  "src/assets", 
  "src/mockServiceWorker.js"
],
```

### Create files  
```bash
mkdir src/mocks  
touch src/mocks/browser.ts
touch src/mocks/handlers.ts
```

### Create an empty handlers array in src/mocks/handlers.ts
```ts
import { rest } from 'msw'

export const handlers = [

]
```

### Fill in browser.ts
```ts
import { setupWorker } from 'msw'
import { handlers } from './handlers'

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers)
```

### Start the worker in development build
Add the following to the top of src/environments/environment.development.ts
```ts
import { worker } from "src/mocks/browser";

worker.start();
```

### Verify that it's working

Run the app and view the console output.  [MSW] Mocking enabled should be logged in the console. 

### Implement vote-count route in handlers.ts
```ts
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

### Verify new functionality
The app should should accept votes and load new cats.

[Next Page: End to End Tests](e2e-test-steps.md)