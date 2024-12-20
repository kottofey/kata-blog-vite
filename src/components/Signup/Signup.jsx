import { Form as RouterForm, Link } from 'react-router-dom';
import { Button, Checkbox, Input } from 'antd';
import classnames from 'classnames';

import cls from './Signup.module.scss';

export default function Signup() {
  return (
    <div className={classnames(cls.signup, cls.signup__card)}>
      <h2 className={cls.signup__title}>Create new account</h2>
      <RouterForm
        method='POST'
        id='signup-form'
      >
        <label
          htmlFor='username'
          className={cls['signup__input-label']}
        >
          Username
        </label>
        <Input
          className={cls.signup__input}
          required
          type='text'
          placeholder='Username'
          name='username'
        />

        <label
          htmlFor='email'
          className={cls['signup__input-label']}
        >
          Email address
        </label>
        <Input
          className={cls.signup__input}
          type='email'
          required
          placeholder='Email address'
          name='email'
        />

        <label
          htmlFor='password'
          className={cls['signup__input-label']}
        >
          Password
        </label>
        <Input.Password
          className={cls.signup__input}
          type='text'
          required
          placeholder='Password'
          name='password'
        />

        <label
          htmlFor='repeatPassword'
          className={cls['signup__input-label']}
        >
          Repeat Password
        </label>
        <Input.Password
          className={cls.signup__input}
          type='text'
          required
          placeholder='Password'
          name='repeatPassword'
        />

        <Checkbox className={cls.signup__checkbox}>
          I agree to the processing of my personal information
        </Checkbox>
        <Button
          type='primary'
          htmlType='submit'
          className={cls.signup__button}
        >
          Create
        </Button>
        <p className={cls.signup__note}>
          Already have an account?&nbsp;
          <Link
            to='/signin'
            className={cls.signup__link}
          >
            Sign In.
          </Link>
        </p>
      </RouterForm>
    </div>
  );
}
