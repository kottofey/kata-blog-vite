import { createBrowserRouter, Link } from 'react-router-dom';

import App from '../components/App';
import ErrorPage from '../components/ErrorPage';
import ArticlesList from '../components/ArticlesList';
import Article, {
  loader as articleLoader,
} from '../components/Article';
import Signin from '../components/Signin';
import Signup from '../components/Signup';
import EditProfile from '../components/EditProfile';

const router = createBrowserRouter([
  {
    path: '/articles?',
    element: <App />,
    errorElement: (
      <ErrorPage>
        <p>
          (На этот раз что-то <b>СИЛЬНО</b> не так...)
        </p>
        <Link
          to='/'
          style={{ color: '#1890FF' }}
        >
          Вернуться на главную
        </Link>
      </ErrorPage>
    ),
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
      {
        path: 'signin',
        element: <Signin />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'signup',
        element: <Signup />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'profile',
        element: <EditProfile />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default router;
