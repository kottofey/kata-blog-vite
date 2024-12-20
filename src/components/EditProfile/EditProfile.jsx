import classnames from 'classnames';
import { Form as RouterForm } from 'react-router-dom';
import { Button, Input } from 'antd';

import cls from './EditProfile.module.scss';

export default function EditProfile() {
  return (
    <div className={classnames(cls.profile, cls.profile__card)}>
      <h2 className={cls.profile__title}>Edit Profile</h2>
      <RouterForm
        method='POST'
        id='signin-form'
      >
        <label
          htmlFor='username'
          className={cls['profile__input-label']}
        >
          Username
        </label>
        <Input
          className={cls.profile__input}
          type='text'
          placeholder='Username'
          name='username'
        />

        <label
          htmlFor='email'
          className={cls['profile__input-label']}
        >
          Email address
        </label>
        <Input
          className={cls.profile__input}
          type='email'
          placeholder='Email address'
          name='email'
        />

        <label
          htmlFor='password'
          className={cls['profile__input-label']}
        >
          New password
        </label>
        <Input.Password
          className={cls.profile__input}
          type='text'
          placeholder='New password'
          name='password'
        />

        <label
          htmlFor='avatar'
          className={cls['profile__input-label']}
        >
          Avatar image (URL)
        </label>
        <Input
          className={classnames(
            cls.profile__input,
            cls['profile__input--last']
          )}
          type='url'
          placeholder='Avatar image'
          name='avatar'
        />

        <Button
          type='primary'
          htmlType='submit'
          className={cls.profile__button}
        >
          Save
        </Button>
      </RouterForm>
    </div>
  );
}
