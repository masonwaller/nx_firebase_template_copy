export const environmentStrings = {
    local: 'local' as const,
    development: 'development' as const,
    production: 'production' as const,
  };
  

export const getBaseApiUrlForEnv = (): string => {
    let baseURL;
    if (window.location.hostname !== 'localhost') {
      baseURL = `${window.location.origin}/api/v0`;
    } else {
      baseURL = `http://localhost:3000/api`;
    }
  
    return baseURL;
  };