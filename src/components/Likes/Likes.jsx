import classnames from 'classnames';
import { useSelector } from 'react-redux';

import cls from './Likes.module.scss';

export default function Likes({ favorited, favoritesCount }) {
  const token = useSelector((state) => state.user.token);

  return (
    <button
      type='button'
      className={classnames({
        [cls['like--full']]: favorited && token,
        [cls['like--gray']]: !token,
        [cls.like]: !favorited && token,
      })}
      disabled={!token}
      onClick={() => {
        console.log('Like');
      }}
    >
      {favoritesCount}
    </button>
  );
}
