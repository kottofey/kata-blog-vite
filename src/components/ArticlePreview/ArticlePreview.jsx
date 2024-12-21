import classnames from 'classnames';
import Markdown from 'markdown-to-jsx';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Link } from 'react-router-dom';

import Tags from '../Tags';
import UserInfo from '../UserInfo';
import Likes from '../Likes';

import cls from './ArticlePreview.module.scss';

export default function ArticlePreview({ article }) {
  const {
    title,
    favoritesCount,
    favorited,
    tagList,
    description,
    author,
    createdAt,
    slug,
  } = article;

  return (
    <article className={classnames([cls.article, cls.article__item])}>
      <h2 className={cls.article__title}>
        <Link to={`/articles/${slug}`}>{title}</Link>
        <Likes
          favoritesCount={favoritesCount}
          favorited={favorited}
        />
      </h2>
      {tagList && tagList.length > 0 && <Tags tagList={tagList} />}
      <UserInfo
        author={author}
        createdAt={createdAt}
      />
      <div className={cls.article__text}>
        <Markdown>{description}</Markdown>
      </div>
    </article>
  );
}
