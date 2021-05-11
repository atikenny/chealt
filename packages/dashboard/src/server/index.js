import { Readable } from 'stream';
import Koa from 'koa';
import Router from '@koa/router';
import serve from 'koa-static';
import { render } from '@lit-labs/ssr/lib/render-with-global-dom-shim.js';

import shell from '../components/App/shell.js';

const app = new Koa();
const router = new Router();

router.get('/', (ctx) => {
  ctx.type = 'text/html';
  ctx.body = Readable.from(render(shell()));
});

app.use(router.routes()).use(router.allowedMethods());
app.use(serve('build'));

const port = 8000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
