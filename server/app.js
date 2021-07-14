const { app: httpServer, initRoutes } = require('./index.js');
const express = require('express');
const { session, cors, login: passport } = require('./middleware');
const db = require('../database');

console.log(session);
const { parse } = require('url');
const next = require('next');

const dev = true;
const nextServer = next({ dev });
const handle = nextServer.getRequestHandler();

nextServer.prepare().then(() => {

  httpServer.use(express.json({ limit: '3MB' }));
  httpServer.use(express.urlencoded({extended:true}));
  httpServer.use(cors.corsPolicy);
  httpServer.use(session.sessionParser)
  httpServer.use(session.cookieParser);
  // httpServer.use(express.bodyParser());

  // httpServer.use(session.sessionParser);
  httpServer.use(passport.initialize());
  httpServer.use(passport.session());
  httpServer.use(session.sessionManager);
  initRoutes(httpServer);

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
