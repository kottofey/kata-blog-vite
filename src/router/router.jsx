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

import * as PATH from './paths';

const router = createBrowserRouter([
  {
    path: PATH.ROOT,
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
        path: PATH.ARTICLE,
        element: <Article />,
        errorElement: <ErrorPage />,
        loader: articleLoader,
      },
      {
        path: PATH.ARTICLE_EDIT,
        element: (
          <ArticleEdit>
            <h1 className={cls.article__header}>Edit article</h1>
          </ArticleEdit>
        ),
        errorElement: <ErrorPage />,
        loader: articleEditLoader,
      },
      {
        path: PATH.SIGNIN,
        element: <Signin />,
        errorElement: <ErrorPage />,
      },
      {
        path: PATH.SIGNUP,
        element: <Signup />,
        errorElement: <ErrorPage />,
      },
      {
        path: PATH.PROFILE,
        element: <ProfileEdit />,
        errorElement: <ErrorPage />,
      },
      {
        path: PATH.ARTICLE_CREATE,
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
        path: PATH.STAR,
        element: <Page404 />,
      },
    ],
  },
]);

export default router;
