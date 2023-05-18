import * as functions from 'firebase-functions';

const runtimeOpts: functions.RuntimeOptions = {
  timeoutSeconds: 540,
  memory: '4GB',
};

export const config = {
  pubsub: {
    region: 'us-east4',
    week: 'every 180 hours',
    day: 'every 24 hours',
    hour: 'every 60 minutes',
    halfhour: 'every 30 minutes',
    twenty: 'every 20 minutes',
    fifteen: 'every 15 minutes',
  },
  firestore: {
    region: 'us-east4',
  },
  api: {
    region: 'us-central1',
  },
  functions: {
    runtimeOpts,
  },
};