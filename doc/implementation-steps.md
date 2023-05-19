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
import { rest } from 'msw';

export const handlers = [
  //TODO: [ML] Populate handlers later
];
```

### Fill in browser.ts
```ts
import { setupWorker } from 'msw';
import { handlers } from 'src/mocks/handlers';

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers);
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
        voteCount: 0
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

### Let's fix the vote count

LocalStorage is available in the browser, so we can use that to persist values across requests.

Update /vote route to increment the vote count and pull the bestCat Id

```ts
let voteCount: number = parseInt(sessionStorage.getItem('voteCount') ?? '0');
voteCount++;
sessionStorage.setItem('voteCount', voteCount.toString());
const payload = await req.json()
return res(
  ctx.status(200),
  ctx.json({
    id: payload.bestCat,
    agree: 20,
    disagree: 8
  })
)
```

Update /vote-count route to use the persisted count

```ts
let voteCount: number = parseInt( sessionStorage.getItem('voteCount') ?? '0');

return res(
  ctx.status(200),
  ctx.json({
    voteCount
  })
)
```

[Next Page: End to End Tests](e2e-test-steps.md)