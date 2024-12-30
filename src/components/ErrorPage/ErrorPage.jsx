import { Link } from 'react-router-dom';

import errUnknown from '../../assets/unknown-error.jpg';
import err599 from '../../assets/599.jpg';

export default function ErrorPage({ error, children }) {
  console.log(`error page: ${JSON.stringify(error, null, 2)}`);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '2rem',
        rowGap: 10,
      }}
    >
      <h1>Опачки... Что-то пошло не так!</h1>
      <h2>Но вы держитесь!</h2>
      <object
        data={`https://http.cat/${error?.status}`}
        type='image/jpeg'
        height={400}
      >
        <img
          src={error?.status === 599 ? err599 : errUnknown}
          height={400}
          alt='Error, something went wrong'
        />
      </object>

      <i>Детали: {error?.message}</i>
      {children}
      <Link
        to='/'
        style={{ color: '#1890FF' }}
      >
        Вернуться на главную
      </Link>
    </div>
  );
}
