import classnames from 'classnames';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

import { getToken } from '../../utils/jwt';
import { setUser, clearUser } from '../../redux/slices/userSlice';
import { useGetUserQuery } from '../../redux/slices/apiSlice';

import cls from './App.module.scss';

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const username = useSelector((state) => state.user.username);
  const avatarUrl = useSelector((state) => state.user.image);

  const { data } = useGetUserQuery(null, {
    skip: !getToken(),
  });

  const ignore = useRef(false);

  useEffect(() => {
    if (data !== undefined) dispatch(setUser(data.user));
    return () => {
      ignore.current = true;
    };
  }, [data, dispatch]);

  return (
    <>
      <header className={cls.header}>
        <span className={cls.header__title}>
          <Link to='/'>Realworld Blog - Kata</Link>
        </span>
        {!getToken() ? (
          <>
            <Link
              to='/signin'
              className={classnames([cls['link--signin'], cls.link])}
              variant='outlined'
              type='text'
            >
              Sign in
            </Link>
            <Link
              to='/signup'
              className={classnames([cls['link--signup'], cls.link])}
              variant='outlined'
              type='text'
            >
              Sign up
            </Link>
          </>
        ) : (
          <>
            <button
              type='button'
              className={classnames([
                cls['btn--create-article'],
                cls.btn,
              ])}
              onClick={() => navigate('new-article')}
            >
              Create Article
            </button>
            <Link
              to='/profile'
              className={cls.user}
            >
              <span className={cls['user--username']}>
                {username}
              </span>
              <div className={cls['user--avatar']}>
                <img
                  src={avatarUrl}
                  alt='User avatar'
                  width={46}
                />
              </div>
            </Link>
            <button
              type='button'
              className={classnames([cls['btn--logout'], cls.btn])}
              onClick={() => dispatch(clearUser())}
            >
              Log Out
            </button>
          </>
        )}
      </header>
      <div className={cls.content}>
        <Outlet />
      </div>
    </>
  );
}
