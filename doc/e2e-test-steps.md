# e2e Tests

Mock Service Worker can be used to mock backend APIs during end to end testing. It simulates real network interactions, increases test reliability, and can provide dynamic responses.

### Add an e2e test for vote failure

```ts
//best-cat.spec.ts
test('App should show error message when vote fails', async ({ page }) => {

  await page.goto('/');
  await page.waitForSelector('h1');

  //TODO: [ML] Do something to make this fail

  await page.locator('label').first().click();
  await page.click('button[type="submit"]');

  await expect(page.getByText('Failed to submit vote')).toBeVisible();
});
```

The test above fails becuase the handler is hard coded to return a success response.  Let's change that!

### Expose msw in environment.development.ts

```ts
import { worker } from "src/mocks/browser";
import { rest } from "msw";

worker.start();

// Propagate the worker and `rest` references to be globally available. 
// This would allow to modify request handlers on runtime. 
declare global {
  interface Window {
    msw: any;
  }
}

window.msw = { 
  worker, 
  rest, 
}; 
```

### Update the test 
```ts
await page.evaluate(() => { 
    const { msw } = window 

    msw.worker.use( 
      msw.rest.post('/vote', async (req, res, ctx) => { 
        return res(ctx.status(500)); 
      })
    );  
  });
```

### Extras

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



[Next Page: Summary](summary-recap.md)