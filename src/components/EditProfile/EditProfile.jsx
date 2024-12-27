import classnames from 'classnames';
import { Form as RouterForm, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';

import { useEditProfileMutation } from '../../redux/slices/apiSlice';
import { setUser } from '../../redux/slices/userSlice';
import { setToken } from '../../utils/jwt';

import schema from './ProfileSchema';
import cls from './EditProfile.module.scss';

export default function EditProfile() {
  const { username, email, image } = useSelector(
    (state) => state.user
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editUser, { isLoading, error }] = useEditProfileMutation({});

  const onSubmitHandle = async (submittedForm) => {
    try {
      const passChecked = { ...submittedForm };
      if (!submittedForm.password) {
        delete passChecked.password;
      }

      const { data } = await editUser({
        user: passChecked,
      });

      dispatch(setUser(data.user));
      setToken(data.user.token);
      navigate(-1);
    } catch {
      /* empty */
    }
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
          defaultValue={username}
          type='text'
          placeholder='Username'
          name='username'
          autoComplete='off'
          {...register('username')}
        />
        <p className={cls.profile__error}>
          {errors?.username?.message || error?.data.errors.username}
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
          defaultValue={email}
          autoComplete='off'
          placeholder='Email address'
          name='email'
          {...register('email')}
        />
        <p className={cls.profile__error}>
          {errors?.email?.message || error?.data.errors.email}
        </p>

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
          defaultValue={image}
          autoComplete='off'
          placeholder='Avatar image'
          name='image'
          {...register('image')}
        />
        <p className={cls.profile__error}>{errors.avatar?.message}</p>

        <button
          type='submit'
          className={classnames(cls.profile__button, {
            [cls['profile__button--disabled']]: isLoading,
          })}
          disabled={isLoading}
        >
          Save
        </button>
      </RouterForm>
    </div>
  );
}
