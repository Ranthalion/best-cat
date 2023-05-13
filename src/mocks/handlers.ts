import { rest } from 'msw'

export const handlers = [

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
        agree: 20,
        disagree: 8
      })
    )
  }),

]