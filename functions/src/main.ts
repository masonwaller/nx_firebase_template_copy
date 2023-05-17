import * as functions from 'firebase-functions';
import { config } from '../../libs/constants/src/lib/config';

//API FUNCTION
import app from '../../apps/server-test/src/main';

export const api = functions
  .runWith({ ...config.functions.runtimeOpts }) //, minInstances: 1 --- change for production
  .region(config.api.region)
  .https.onRequest(app.default as any);