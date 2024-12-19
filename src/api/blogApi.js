const BASE_URL = 'https://blog-platform.kata.academy/api';

const callApi = async (url, method, body) => {
  const resp = await fetch(url, {
    method,
    body: body || null,
    headers: {
      Accept: 'application/json',
    },
  });

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

// todo make auth token
// export const createArticle = async (article) => {
//   return callApi('/articles', 'POST', article);
// };

// console.log(await getArticles(3, 2));
