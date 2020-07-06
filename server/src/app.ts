// /src/app.ts
import Koa from 'koa';
import Router from 'koa-router'

const router = new Router()
const app = new Koa();

router.get('/',async (ctx) => {
    ctx.body = '测'
})

app.use(router.routes())


app.listen(3000)