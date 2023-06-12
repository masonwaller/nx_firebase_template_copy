import { environment as devEnv } from './environment';
import { environmentStrings } from './utils';

let envVars = devEnv;

switch (process.env.NODE_ENV) {
//   case environmentStrings.development:
//     envVars = devEnv;
//     break;
  default:
    envVars = devEnv;
}

export default envVars;