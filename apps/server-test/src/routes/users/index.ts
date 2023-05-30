import * as express from 'express';
import {
  getUser,
  createUser
} from './crudUsers';

export const usersRouter = express.Router();

usersRouter.get('/users', getUser);

usersRouter.post('/users', createUser);
