import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { useFetcher } from 'react-router-dom';

import {
  useDislikeArticleMutation,
  useLikeArticleMutation,
} from '../../redux/slices/apiSlice';

import cls from './Likes.module.scss';

export default function Likes({ article }) {
  const { slug, favorited, favoritesCount } = article;

  const token = useSelector((state) => state.user.token);
  const fetcher = useFetcher();

  // const favorited = fetcher.formData
  //   ? fetcher.formData.get('favorited') === 'true'
  //   : article.favorited;

  const [like] = useLikeArticleMutation({});

  const [dislike] = useDislikeArticleMutation({});

  const handleLike = () => {
    return favorited ? dislike(slug) : like(slug);
  };

  return (
    <fetcher.Form>
      <button
        type='button'
        name='favorited'
        className={classnames({
          [cls['like--full']]: favorited && token,
          [cls.like]: !favorited && token,
          [cls['like--gray']]: !token,
        })}
        disabled={!token}
        onClick={handleLike}
      >
        {favoritesCount}
      </button>
    </fetcher.Form>
  );
}
