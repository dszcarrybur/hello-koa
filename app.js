const Koa = require('koa');

const app = new Koa();

const mymodule=require('./mymodule');

app.use(async (ctx, next) => {
    const start = new Date().getTime();
    await next();
    const ms = new Date().getTime() - start;
    console.log(`${ctx.request.method} ${ctx.request.url}: ${ms}ms`);
    ctx.response.set('X-Response-Time', `${ms}ms`);
});

app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
    mymodule('koa');
    mymodule('koa2');
    mymodule('koa3');
    mymodule('koa4');

});

app.listen(3000);
console.log('app started at port 3000...');