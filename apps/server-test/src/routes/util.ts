export const checkIfExpired = (expiresInUtcMillis: number) => {
    const today = new Date().getTime();
    const isExpired = today > expiresInUtcMillis;
    return isExpired;
  };
  