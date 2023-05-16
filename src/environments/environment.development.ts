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

export const environment = {
  NAME: 'Development',
  API_BASE: ''
}