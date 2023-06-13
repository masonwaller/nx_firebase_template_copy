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

export const apiEndpoints = {
  users: `${envVars.baseApiUrl}/users`,
  blogs: `${envVars.baseApiUrl}/blogs`,
};