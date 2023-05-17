import { rest } from 'msw'

export const handlers = [

  rest.get('/vote-count', (req, res, ctx) => {
    
    let voteCount: number = parseInt( sessionStorage.getItem('voteCount') ?? '0');
    
    return res(
      ctx.status(200),
      ctx.json({
        voteCount
      })
    )
  }),

  rest.post('/vote', async (req, res, ctx) => {

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
  }),

]