import classnames from 'classnames';
import { Form as RouterForm, Link } from 'react-router-dom';
import { Button, Input } from 'antd';

import cls from './Signin.module.scss';

export default function Signin() {
  return (
    <div className={classnames(cls.signin, cls.signin__card)}>
      <h2 className={cls.signin__title}>Sign In</h2>
      <RouterForm
        method='POST'
        id='signin-form'
      >
        <label
          htmlFor='email'
          className={cls['signin__input-label']}
        >
          Email address
        </label>
        <Input
          className={cls.signin__input}
          type='email'
          required
          placeholder='Email address'
          name='email'
        />

        <label
          htmlFor='password'
          className={cls['signin__input-label']}
        >
          Password
        </label>
        <Input.Password
          className={cls.signin__input}
          type='text'
          required
          placeholder='Password'
          name='password'
        />

        <Button
          type='primary'
          htmlType='submit'
          className={cls.signin__button}
        >
          Log In
        </Button>
        <p className={cls.signin__note}>
          Don&#39;t have an account?&nbsp;
          <Link
            to='.signin'
            className={cls.signin__link}
          >
            Register.
          </Link>
        </p>
      </RouterForm>
    </div>
  );
}
