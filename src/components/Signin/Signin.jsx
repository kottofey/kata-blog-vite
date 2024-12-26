import classnames from 'classnames';
import {
  Form as RouterForm,
  Link,
  useNavigate,
} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';

import { clearUser, setUser } from '../../redux/slices/userSlice';
import { useSigninMutation } from '../../redux/slices/apiSlice';
import { setToken } from '../../utils/jwt';
import ErrorPage from '../ErrorPage';

import schema from './SigninSchema';
import cls from './Signin.module.scss';

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [singin, { isLoading, isError, error }] = useSigninMutation(
    {}
  );

  const onSubmitHandle = async (submittedForm) => {
    try {
      const { data } = await singin({
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
    <div className={classnames(cls.signin, cls.signin__card)}>
      <h2 className={cls.signin__title}>Sign In</h2>
      <RouterForm
        id='signin-form'
        onSubmit={handleSubmit(onSubmitHandle)}
      >
        <label
          htmlFor='email'
          className={cls['signin__input-label']}
        >
          Email address
        </label>
        <input
          className={cls.signin__input}
          type='text'
          placeholder='Email address'
          name='email'
          autoComplete='off'
          {...register('email')}
        />
        <p className={cls.signin__error}>{errors.email?.message}</p>

        <label
          htmlFor='password'
          className={cls['signin__input-label']}
        >
          Password
        </label>
        <input
          className={cls.signin__input}
          type='password'
          placeholder='Password'
          name='password'
          {...register('password')}
        />
        <p className={cls.signin__error}>
          {errors.password?.message}
        </p>

        <button
          type='submit'
          className={classnames(cls.signin__button, {
            [cls['signin__button--disabled']]: isLoading,
          })}
          disabled={isLoading}
        >
          Log In
        </button>
        <p className={cls.signin__note}>
          Don&#39;t have an account?&nbsp;
          <Link
            to='/signup'
            className={cls.signin__link}
          >
            Register.
          </Link>
        </p>
      </RouterForm>
    </div>
  );
}
