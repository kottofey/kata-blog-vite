import classnames from 'classnames';
import {
  Form as RouterForm,
  Link,
  useNavigate,
} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';

import { setLogin } from '../../redux/slices/userSlice';
import { login } from '../../api/blogApi';
import { setToken } from '../../utils/jwt';

import schema from './SigninSchema';
import cls from './Signin.module.scss';

export default function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandle = async (data) => {
    const resp = await login({ user: data });
    dispatch(setLogin(resp.user));
    setToken(resp?.user?.token);
    navigate('/');
  };

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
          className={cls.signin__button}
        >
          Log In
        </button>
        <p className={cls.signin__note}>
          Don&#39;t have an account?&nbsp;
          <Link
            to='/signin'
            className={cls.signin__link}
          >
            Register.
          </Link>
        </p>
      </RouterForm>
    </div>
  );
}
