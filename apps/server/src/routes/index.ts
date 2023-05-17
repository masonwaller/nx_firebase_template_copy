import * as express from 'express';
import { authorizationRouter } from './authentication';
import { blogsRouter } from './blogs';
import { usersRouter } from './users';


export function routes() {
  const app = express.Router();
  
  app.use(usersRouter);
  app.use(blogsRouter)
  app.use(authorizationRouter)


  return app;
}
