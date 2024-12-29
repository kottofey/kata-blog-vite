import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { useDeleteArticleMutation } from '../../redux/slices/apiSlice';

import cls from './ArticleButtons.module.scss';

export default function ArticleButtons({ slug }) {
  const [deleteArticle] = useDeleteArticleMutation();
  const navigate = useNavigate();

  return (
    <div className={cls.wrapper}>
      <button
        type='button'
        className={classnames(cls.button, cls['button--edit'])}
        onClick={() => navigate('edit')}
      >
        Edit
      </button>
      <button
        type='button'
        className={classnames(cls.button, cls['button--delete'])}
        onClick={() => {
          deleteArticle(slug);
          navigate('/');
        }}
      >
        Delete
      </button>
    </div>
  );
}
