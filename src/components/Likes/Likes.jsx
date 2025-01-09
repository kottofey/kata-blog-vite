import classnames from 'classnames';

import {
  useDislikeArticleMutation,
  useGetArticleQuery,
  useLikeArticleMutation,
} from '../../redux/slices/apiSlice';
import { getToken } from '../../utils/jwt';

import cls from './Likes.module.scss';

export default function Likes({ slug }) {
  const { data } = useGetArticleQuery(slug);

  const [like, { data: likeData }] = useLikeArticleMutation({});

  const [dislike, { data: dislikeData }] = useDislikeArticleMutation(
    {}
  );

  let combinedFavorited = data?.article?.favorited;
  let combinedFavoritesCount = data?.article?.favoritesCount;

  const handleLike = () => {
    if (data?.article?.favorited) {
      dislike(slug);
      combinedFavorited = dislikeData?.article.favorited;
    } else {
      like(slug);
      combinedFavoritesCount = likeData?.article.favoritesCount;
    }
  };

  return (
    <button
      type='button'
      name='favorited'
      className={classnames({
        [cls['like--full']]: combinedFavorited && getToken(),
        [cls.like]: !combinedFavorited && getToken(),
        [cls['like--gray']]: !getToken(),
      })}
      disabled={!getToken()}
      onClick={handleLike}
    >
      {combinedFavoritesCount}
    </button>
  );
}
