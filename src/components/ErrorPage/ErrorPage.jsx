import { useRouteError } from 'react-router-dom';

export default function ErrorPage({ children }) {
  const error = useRouteError();
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '2rem',
      }}
    >
      <h1>Опачки... Что-то пошло не так!</h1>
      <h2>Но вы держитесь!</h2>
      <i>Ошибка: {error.statusText || error.message}</i>
      {children}
    </div>
  );
}
