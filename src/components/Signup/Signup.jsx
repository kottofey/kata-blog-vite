import {
  Form as ReactRouterForm,
  Link,
  useNavigate,
} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';

import { useSignupMutation } from '../../redux/slices/apiSlice';
import { clearUser, setUser } from '../../redux/slices/userSlice';
import { setToken } from '../../utils/jwt';
import ErrorPage from '../ErrorPage';

import schema from './SignupSchema';
import cls from './Signup.module.scss';

export default function Signup() {
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
  const [signup, { isLoading, isError, error }] = useSignupMutation(
    {}
  );

  const onSubmitHandle = async (submittedForm) => {
    try {
      const { data } = await signup({
        user: submittedForm,
      });

      dispatch(setUser(data?.user));
      setToken(data?.user.token);
      navigate(-1);
    } catch {
      dispatch(clearUser());
    }
  };

  if (isError) {
    return <ErrorPage error={error} />;
  }

  return (
    <div className={classnames(cls.signup, cls.signup__card)}>
      <h2 className={cls.signup__title}>Create new account</h2>
      <ReactRouterForm
        id='signup-form'
        onSubmit={handleSubmit(onSubmitHandle)}
      >
        <label
          htmlFor='username'
          className={cls['signup__input-label']}
        >
          Username
        </label>
        <input
          className={cls.signup__input}
          type='text'
          placeholder='Username'
          name='username'
          autoComplete='off'
          {...register('username')}
          defaultValue='qwe'
        />
        <p className={cls.signup__error}>
          {errors.username?.message}
        </p>

        <label
          htmlFor='email'
          className={cls['signup__input-label']}
        >
          Email address
        </label>
        <input
          className={cls.signup__input}
          type='text'
          placeholder='Email address'
          autoComplete='off'
          name='email'
          {...register('email')}
          defaultValue='qwe@qwe'
        />
        <p className={cls.signup__error}>{errors.email?.message}</p>
        <label
          htmlFor='password'
          className={cls['signup__input-label']}
        >
          Password
        </label>
        <input
          className={cls.signup__input}
          type='password'
          placeholder='Password'
          name='password'
          {...register('password')}
          defaultValue='qweqwe'
        />
        <p className={cls.signup__error}>
          {errors.password?.message}
        </p>
        <label
          htmlFor='repeatPassword'
          className={cls['signup__input-label']}
        >
          Repeat Password
        </label>
        <input
          className={cls.signup__input}
          type='password'
          placeholder='Repeat password'
          name='repeatPassword'
          {...register('repeatPassword')}
          defaultValue='qweqwe'
        />
        <p className={cls.signup__error}>
          {errors.repeatPassword && 'Passwords must match'}
        </p>

        <label
          htmlFor='isChecked'
          className={classnames(
            cls['signup__input-label'],
            cls['signup__input-label--checkbox']
          )}
        >
          <input
            type='checkbox'
            className={cls.signup__checkbox}
            name='isChecked'
            {...register('isChecked')}
            defaultChecked
          />
          I agree to the processing of my personal information
        </label>
        <p className={cls.signup__error}>
          {errors.isChecked?.message}
        </p>

        <button
          type='submit'
          className={classnames(cls.signup__button, {
            [cls['signup__button--disabled']]: isLoading,
          })}
          disabled={isLoading}
        >
          Create
        </button>
        <p className={cls.signup__note}>
          Already have an account?&nbsp;
          <Link
            to='/signin'
            className={cls.signup__link}
          >
            Sign In.
          </Link>
        </p>
      </ReactRouterForm>
    </div>
  );
}
