import classnames from 'classnames';
import Markdown from 'markdown-to-jsx';
import { Link } from 'react-router-dom';

import Tags from '../Tags';
import UserInfo from '../UserInfo';
import Likes from '../Likes';

import cls from './ArticlePreview.module.scss';

export default function ArticlePreview({ article }) {
  const { title, tagList, description, author, createdAt, slug } =
    article;

  return (
    <article className={classnames([cls.article, cls.article__item])}>
      <h2 className={cls.article__title}>
        <Link
          to={`/articles/${slug}`}
          className={cls['article__title--link']}
        >
          {title}
        </Link>
        <Likes slug={article.slug} />
      </h2>
      {tagList && tagList.length > 0 && <Tags tagList={tagList} />}
      <UserInfo
        author={author}
        createdAt={createdAt}
      />
      <Markdown className={cls.article__text}>{description}</Markdown>
    </article>
  );
}
