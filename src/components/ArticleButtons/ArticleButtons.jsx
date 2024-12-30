import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Button, Popconfirm } from 'antd';

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
      <Popconfirm
        title='Delete article'
        description='Are you sure to delete?'
        okText='Yes'
        cancelText='No'
        onConfirm={() => {
          deleteArticle(slug);
          navigate('/');
        }}
      >
        <Button
          type='button'
          className={classnames(cls.button, cls['button--delete'])}
        >
          Delete
        </Button>
      </Popconfirm>
    </div>
  );
}
