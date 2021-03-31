import express from 'express';
import path from 'path';
import fs from 'fs';
import passport from 'passport';
import { server } from 'config';
import router from 'router';
import { passport as passportMw, session } from 'middlewares';

import './db';


passport.use(passportMw.localStrategy);
passport.serializeUser(passportMw.serializeUser);
passport.deserializeUser(passportMw.deserializeUser);

const app = express();

app
  .use('/api/v1/static', express.static(path.resolve('build/images')))
  .use(session)
  .use(passport.initialize())
  .use(passport.session())
  .use(express.json())
  .use('/api/v1', router)
  .use((error, req, res, next) => {
    return res.status(500).json({ error: error.toString() });
  });

app.listen(server.port, () => {
  const imagesDirPath = path.resolve('build/images');
  if (!fs.existsSync(imagesDirPath)) {
    fs.mkdirSync(imagesDirPath);
  }
  console.info('Server start!');
  console.info(`On port ${server.port}, http://localhost:${server.port}`);
});