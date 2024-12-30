import { createBrowserRouter } from 'react-router-dom';

import App from '../components/App';
import ErrorPage from '../components/ErrorPage';
import ArticlesList from '../components/ArticlesList';
import Article, {
  loader as articleLoader,
} from '../components/Article';
import Signin from '../components/Signin';
import Signup from '../components/Signup';
import ProfileEdit from '../components/ProfileEdit';
import Page404 from '../components/Page404';
import ArticleEdit, {
  loader as articleEditLoader,
} from '../components/ArticleEdit';
import cls from '../components/ArticleEdit/ArticleEdit.module.scss';

const router = createBrowserRouter([
  {
    path: '/articles?',
    element: <App />,
    errorElement: (
      <ErrorPage>
        <p>
          (Something went <b>REALLY</b> wrong...)
        </p>
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
        element: <Article />,
        errorElement: <ErrorPage />,
        loader: articleLoader,
      },
      {
        path: '/articles/:slug/edit',
        element: (
          <ArticleEdit>
            <h1 className={cls.article__header}>Edit article</h1>
          </ArticleEdit>
        ),
        errorElement: <ErrorPage />,
        loader: articleEditLoader,
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
        element: <ProfileEdit />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'new-article',
        element: (
          <ArticleEdit>
            <h1 className={cls.article__header}>
              Create new article
            </h1>
          </ArticleEdit>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: '*',
        element: <Page404 />,
      },
    ],
  },
]);

export default router;
