import classnames from 'classnames';

import cls from './Likes.module.scss';

export default function Likes({
  favorited,
  favoritesCount,
  isLoggedIn,
}) {
  return (
    <button
      type='button'
      className={classnames({
        [cls['like--full']]: favorited && isLoggedIn,
        [cls['like--gray']]: !isLoggedIn,
        [cls.like]: !favorited && isLoggedIn,
      })}
      onClick={() => {
        console.log('Like');
      }}
    >
      {favoritesCount}
    </button>
  );
}
