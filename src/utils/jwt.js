export function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => {
        return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
      })
      .join('')
  );
  return JSON.parse(jsonPayload);
}

export const getToken = () => {
  return localStorage.getItem('token');
};
export const setToken = (token) => {
  localStorage.setItem('token', token);
};
export const removeToken = () => {
  localStorage.removeItem('token');
};
