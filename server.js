const Koa = require('koa');
const Router = require('koa-router');
const renderer = require('vue-server-renderer').createRenderer(
    {
      template:require('fs').readFileSync('./src/index.html', 'utf-8')
    }
);
// 1. 创建koa koa-router实列

const app = new Koa();
const router = new Router();

// 2. 路由中间件
const createApp = require('./src/app');

router.get('*', async(ctx, next) => {
  // 创建vue实列
  const app =createApp(ctx);

  const context = {
    title: 'vue服务器渲染组件',
    meta: `
      <meta charset="utf-8">
      <meta name="" content="vue服务器渲染组件">
    `
  };
  try {
    // vue 实列转换成字符串
    const html = await renderer.renderToString(app,context);
    ctx.status = 200;
    ctx.body = html
  } catch(e) {
    console.log(e);
    ctx.status = 500;
    ctx.body = '服务器错误';
  }
});

// 加载路由组件
app
    .use(router.routes())
    .use(router.allowedMethods());

// 启动服务
app.listen(3000, () => {
  console.log(`server started at localhost:3000`);
});