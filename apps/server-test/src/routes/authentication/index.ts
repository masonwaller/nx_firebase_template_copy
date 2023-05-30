import * as express from 'express';
import { body } from 'express-validator';
import { checkIfUserIsAuthorized, oneTimeUserAuthorization } from './crudAuthorization';

export const authorizationRouter = express.Router();

authorizationRouter.get('/authorization', checkIfUserIsAuthorized);

authorizationRouter.post(
  '/authorization',
  body('accessToken').exists().notEmpty().isString(),
  oneTimeUserAuthorization
);