import { Readable } from 'stream';
import Koa from 'koa';
import { render } from '@lit-labs/ssr/lib/render-with-global-dom-shim.js';

import shell from '../components/App/shell.js';

const app = new Koa();

app.use(async (ctx) => {
  ctx.type = 'text/html';
  ctx.body = Readable.from(render(shell()));
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
