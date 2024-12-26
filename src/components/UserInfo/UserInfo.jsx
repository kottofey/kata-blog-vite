import handleDate from '../../utils/handleDate';

import cls from './UserInfo.module.scss';

export default function UserInfo({ author, createdAt }) {
  const { username, image } = author;
  return (
    <div className={cls.user}>
      <div className={cls['user__text-wrapper']}>
        <span className={cls.user__name}>{username}</span>
        <span className={cls.user__date}>
          {handleDate(createdAt)}
        </span>
      </div>
      <img
        className={cls.user__avatar}
        src={image}
        alt='User avavtar'
      />
    </div>
  );
}
