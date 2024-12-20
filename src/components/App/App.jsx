import classnames from 'classnames';
import { Link, Outlet } from 'react-router-dom';

import cls from './App.module.scss';

export default function App() {
  return (
    <>
      <header className={cls.header}>
        <span className={cls.header__title}>
          <Link to='/'>Realworld Blog - Kata</Link>
        </span>
        <Link
          to='/signin'
          className={classnames([cls['link--signin'], cls.link])}
          variant='outlined'
          type='text'
          onClick={() => {
            console.log('SignIn');
          }}
        >
          Sign in
        </Link>
        <Link
          to='/signup'
          className={classnames([cls['link--signup'], cls.link])}
          variant='outlined'
          type='text'
          onClick={() => {
            console.log('SignUp');
          }}
        >
          Sign up
        </Link>
      </header>
      <div className={cls.content}>
        <Outlet />
      </div>
    </>
  );
}
