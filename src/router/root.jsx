import { createBrowserRouter } from 'react-router-dom';

import App from '../components/App';
import ErrorPage from '../components/ErrorPage';
import ArticlesList from '../components/ArticlesList';
import Article, {
  loader as articleLoader,
} from '../components/Article';

const router = createBrowserRouter([
  {
    path: '/articles?',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ArticlesList />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/articles/:slug',
        loader: articleLoader,
        element: <Article />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default router;
