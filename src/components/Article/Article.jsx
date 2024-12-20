import Markdown from 'markdown-to-jsx';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import classnames from 'classnames';
import { useLoaderData } from 'react-router-dom';

import Likes from '../Likes';
import Tags from '../Tags';
import UserInfo from '../UserInfo';
import { getArticle } from '../../api/blogApi';

import cls from './Article.module.scss';

export const loader = async ({ params }) => {
  console.log('Article loader');
  return getArticle(params.slug);
};

export default function Article({ isLoggedIn = false }) {
  const { article } = useLoaderData();
  const {
    title,
    description,
    body,
    createdAt,
    tagList,
    favoritesCount,
    favorited,
    author,
  } = article;

  return (
    <article className={classnames([cls.article])}>
      <h2 className={cls.article__title}>
        {title}
        <Likes
          favorited={favorited}
          favoritesCount={favoritesCount}
          isLoggedIn={isLoggedIn}
        />
      </h2>
      {tagList && <Tags tagList={tagList} />}
      <UserInfo
        author={author}
        createdAt={createdAt}
      />
      <div className={cls.article__text}>
        <Markdown
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkGfm]}
        >
          {description}
        </Markdown>
      </div>

      <div className={cls.article__text}>
        <Markdown
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkGfm]}
        >
          {body}
        </Markdown>
      </div>
    </article>
  );
}
