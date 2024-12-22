const BASE_URL = 'https://blog-platform.kata.academy/api';

const callApi = async (url, method, body, headers) => {
  const fetchInit = {
    method,
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (!body) delete fetchInit.body;

  const resp = await fetch(url, fetchInit);

  // if (!window.navigator.onLine)
  //   throw Error('Нет интернета', {
  //     cause: { status: 523, statusText: 'No internet connection' },
  //   });

  if (!resp.ok) {
    throw Error('Ошибка', { cause: resp });
  }
  return resp.json();
};

export const getArticles = async (limit, offset) => {
  const url = new URL(`${BASE_URL}/articles`);

  url.searchParams.set('limit', limit);
  url.searchParams.set('offset', offset);
  return callApi(url, 'GET');
};

export const getArticle = async (slug) => {
  return callApi(`${BASE_URL}/articles/${slug}`, 'GET');
};

export const login = async (user) => {
  return callApi(`${BASE_URL}/users/login`, 'POST', user, null);
};

export const getUser = async (token) => {
  const headers = {
    Authorization: `Token ${token}`,
  };
  return callApi(`${BASE_URL}/user`, 'GET', null, headers);
};
