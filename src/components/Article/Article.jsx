import Markdown from 'markdown-to-jsx';
import classnames from 'classnames';
import { useLoaderData } from 'react-router-dom';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';

import Likes from '../Likes';
import Tags from '../Tags';
import UserInfo from '../UserInfo';
import { useGetArticleQuery } from '../../redux/slices/apiSlice';
import ErrorPage from '../ErrorPage';
import ArticleButtons from '../ArticleButtons';

import cls from './Article.module.scss';

export const loader = ({ params }) => {
  return params.slug;
};

export default function Article() {
  const slug = useLoaderData();
  const currentUser = useSelector((state) => state.user.username);
  const { data, isLoading, isError, error } =
    useGetArticleQuery(slug);

  if (isError) {
    return <ErrorPage error={error} />;
  }

  return (
    <article className={classnames([cls.article])}>
      {isLoading ? (
        <Spin size='large' />
      ) : (
        <>
          <h2 className={cls.article__title}>
            {data?.article.title ?? ''}
            <Likes slug={data?.article.slug} />
          </h2>
          {data?.article.tagList && (
            <Tags tagList={data?.article.tagList} />
          )}
          <UserInfo
            author={data?.article.author}
            createdAt={data?.article.createdAt}
          />
          <div className={cls['description-wrapper']}>
            <div
              className={classnames(
                cls.article__text,
                cls['article__text--description']
              )}
            >
              <Markdown>{data?.article.description ?? ''}</Markdown>
            </div>

            {currentUser === data?.article.author?.username && (
              <ArticleButtons slug={slug} />
            )}
          </div>

          <div className={classnames(cls.article__text)}>
            <Markdown className={cls['article__text--body']}>
              {data?.article.body ?? ''}
            </Markdown>
          </div>
        </>
      )}
    </article>
  );
}
