import classnames from 'classnames';
import { Form as RouterForm, useNavigate } from 'react-router-dom';
import { Button, Input } from 'antd';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import schema from './ProfileSchema';
import cls from './EditProfile.module.scss';

export default function EditProfile() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandle = async (data) => {
    console.log('handleSubmit', data);
    navigate('/');
  };

  return (
    <div className={classnames(cls.profile, cls.profile__card)}>
      <h2 className={cls.profile__title}>Edit Profile</h2>
      <RouterForm
        id='signin-form'
        method='POST'
        onSubmit={handleSubmit(onSubmitHandle)}
      >
        <label
          htmlFor='username'
          className={cls['profile__input-label']}
        >
          Username
        </label>
        <input
          className={cls.profile__input}
          type='text'
          placeholder='Username'
          name='username'
          autoComplete='off'
          {...register('username')}
        />
        <p className={cls.profile__error}>
          {errors.username?.message}
        </p>

        <label
          htmlFor='email'
          className={cls['profile__input-label']}
        >
          Email address
        </label>
        <input
          className={cls.profile__input}
          type='email'
          autoComplete='off'
          placeholder='Email address'
          name='email'
          {...register('email')}
        />
        <p className={cls.profile__error}>{errors.email?.message}</p>

        <label
          htmlFor='password'
          className={cls['profile__input-label']}
        >
          New password
        </label>
        <input
          className={cls.profile__input}
          type='password'
          placeholder='New password'
          name='password'
          {...register('password')}
        />
        <p className={cls.profile__error}>
          {errors.password?.message}
        </p>

        <label
          htmlFor='avatar'
          className={cls['profile__input-label']}
        >
          Avatar image (URL)
        </label>
        <input
          className={classnames(
            cls.profile__input,
            cls['profile__input--last']
          )}
          type='text'
          autoComplete='off'
          placeholder='Avatar image'
          name='avatar'
          {...register('avatar')}
        />
        <p className={cls.profile__error}>{errors.avatar?.message}</p>

        <button
          type='submit'
          className={cls.profile__button}
        >
          Save
        </button>
      </RouterForm>
    </div>
  );
}
