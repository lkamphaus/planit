const { app: httpServer } = require('./index.js');
const { session, cors } = require('./middleware');
const { parse } = require('url');
const next = require('next');

const dev = true;
const nextServer = next({ dev });
const handle = nextServer.getRequestHandler();

console.log('rs')

nextServer.prepare().then(() => {

  httpServer.use(cors.corsPolicy);
  httpServer.use(session.sessionParser);
  httpServer.use(session.sessionManager);
  // server-sided rendering
  httpServer.use((req, res, next) => {
    const { method } = req;

    // proxy all get requests to render to the virtual
    // next.js server.
    if (method === 'GET') {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (!pathname.startsWith('/api')) {
        nextServer.render(req, res, pathname, query);
      } else {
        next();
      }
    }
  })


  httpServer.listen(3000, () => {
    console.log('Listening on localhost:3000');
  })
});
