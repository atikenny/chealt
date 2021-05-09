import { html } from 'lit';

import appRoot from './app.js';

const shell = () => html`
  <!DOCTYPE >
  <html>
    <head>
      <title>Chealt Dashboard</title>
    </head>
    <body>
      ${appRoot()}
    </body>
  </html>
`;

export default shell;
