const storage = localStorage;

export const tokenStorage = {
  getToken: () => {
    const accessToken = storage.getItem('accessToken');

    return accessToken;
  },
  setToken: (token: string) => {
    storage.setItem('accessToken', token);
  },
  clearToken: () => {
    storage.removeItem('accessToken');
  },
};
