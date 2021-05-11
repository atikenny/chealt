import { html } from 'lit';

import appRoot from './app.js';

const shell = () => html`
  <!DOCTYPE >
  <html>
    <head>
      <title>Chealt Dashboard</title>
      <link rel="stylesheet" href="/css/reset.css" />
    </head>
    <body>
      ${appRoot()}
    </body>
  </html>
`;

export default shell;
