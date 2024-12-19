import classnames from 'classnames';
import { Button } from 'antd';
import { Link, Outlet } from 'react-router-dom';

import cls from './App.module.scss';

export default function App() {
  return (
    <>
      <header className={cls.header}>
        <span className={cls.header__title}>
          <Link to='/'>Realworld Blog - Kata</Link>
        </span>
        <Button
          className={classnames([cls['btn--signin'], cls.btn])}
          variant='outlined'
          type='text'
          onClick={() => {
            console.log('SignIn');
          }}
        >
          Sign in
        </Button>
        <Button
          className={classnames([cls['btn--signup'], cls.btn])}
          variant='outlined'
          type='text'
          onClick={() => {
            console.log('SignUp');
          }}
        >
          Sign up
        </Button>
      </header>
      <div className={cls.content}>
        <Outlet />
      </div>
    </>
  );
}
