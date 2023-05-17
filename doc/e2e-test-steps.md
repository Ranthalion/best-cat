# Unit Tests

Mock Service Worker can be used to mock backend APIs during unit testing. It simulates real network interactions, increases test reliability, and can provide dynamic responses.

### Create server.ts
```bash
touch src/mocks/server.ts
```

```ts
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const mswServer = setupServer(...handlers)
```

### Create unit test file
```bash
touch src/app/app.component-msw.spec.ts
```

```ts
import '@testing-library/jest-dom';
import { mswServer } from 'src/mocks/server';

beforeEach(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());
```