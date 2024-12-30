import { Link } from 'react-router-dom';

import errUnknown from '../../assets/unknown-error.jpg';

export default function Page404() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h1>Page not Found</h1>
      <img
        src={errUnknown}
        alt='Page not found'
        width={400}
      />
      <Link
        to='/'
        style={{ color: '#1890FF', marginTop: 20, fontSize: '2rem' }}
      >
        Back to Main Page
      </Link>
    </div>
  );
}
