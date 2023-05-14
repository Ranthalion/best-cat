import '@testing-library/jest-dom';
import { mswServer } from 'src/mocks/server';

beforeEach(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

//TODO: [ML] Define some sample tests