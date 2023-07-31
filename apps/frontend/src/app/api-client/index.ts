import axios from 'axios';
import envVars from '../../environments/envConfig';

const buildApiClientWithAuth = () => {
  const instance = axios.create();

  instance.interceptors.request.use(async (config) => {
    //add firebase tokens if need and other auth stuff here

    // EXAMPLE:
    // const token = await getFirebaseUserToken();
    // config.headers.Authorization = token ? `Bearer ${token}` : '';

    return config;
  });

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      function tempAlert(msg: any, duration: any) {
        console.error(msg, ' Error: ', err);
      }
      tempAlert('Request failed.  If persists, please contact site Admin.', 5000);
    }
  );

  return instance;
};

export const apiClientWithAuth = buildApiClientWithAuth();

console.log(window.location.hostname,'window.location.hostname', window.location.origin, 'window.location.origin')
const baseApiUrl = window.location.hostname === 'localhost' || window.location.hostname === 'github' ? 'http://localhost:3000/api': `${window.location.origin}/api`;
console.log(baseApiUrl,'baseApiUrl')

export const apiEndpoints = {
  users: `${baseApiUrl}/users`, //envVars.baseApiUrl
  blogs: `${baseApiUrl}/blogs`,
};