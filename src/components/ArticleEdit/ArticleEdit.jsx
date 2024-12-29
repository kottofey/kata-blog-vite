import {
  Form as RouterForm,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import classnames from 'classnames';

import {
  useCreateArticleMutation,
  useEditArticleMutation,
  useGetArticleQuery,
} from '../../redux/slices/apiSlice';

import schema from './ArticleSchema';
import cls from './ArticleEdit.module.scss';

export const loader = ({ params }) => {
  return params.slug;
};

export default function ArticleEdit({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const slug = useLoaderData();

  const { data } = useGetArticleQuery(slug, {
    skip: !slug,
  });

  const [
    createArticle,
    { isLoading: createLoading, error: createError },
  ] = useCreateArticleMutation({});

  const [editArticle, { isLoading: editLoading, error: editError }] =
    useEditArticleMutation({});

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      tagList: slug ? data?.article?.tagList : [''],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'tagList',
    control,
  });

  const onSubmitHandle = async (submittedForm) => {
    try {
      const passChecked = { ...submittedForm };
      if (!submittedForm.password) {
        delete passChecked.password;
      }

      if (!slug) {
        await createArticle({
          article: submittedForm,
        });
        navigate('/');
      } else {
        await editArticle({
          slug,
          article: { article: submittedForm },
        });
        navigate(-1);
      }
    } catch {
      /* empty */
    }
  };

  console.log(errors);

  return (
    <div className={cls.article}>
      {children}
      <RouterForm
        className={cls.article__form}
        id='signin-form'
        method='POST'
        onSubmit={handleSubmit(onSubmitHandle)}
      >
        <label
          htmlFor='title'
          className={cls['article__input-label']}
        >
          Title
        </label>
        <input
          type='text'
          className={cls.article__input}
          name='title'
          placeholder='Title'
          autoComplete='off'
          defaultValue={slug ? data?.article?.title : ''}
          id='title'
          {...register('title')}
        />
        <p className={cls['article__input-error']}>
          {errors?.title?.message ||
            editError?.data.errors.title ||
            createError?.data.errors.title}
        </p>

        <label
          htmlFor='description'
          className={cls['article__input-label']}
        >
          Short description
        </label>
        <input
          type='text'
          className={cls.article__input}
          name='description'
          placeholder='Description'
          autoComplete='off'
          defaultValue={slug ? data?.article?.description : ''}
          id='description'
          {...register('description')}
        />
        <p className={cls['article__input-error']}>
          {errors?.description?.message ||
            editError?.data.errors.description ||
            createError?.data.errors.description}
        </p>

        <label
          htmlFor='body'
          className={cls['article__input-label']}
        >
          Text
        </label>
        <textarea
          name='body'
          className={classnames(
            cls.article__input,
            cls['article__input--textbox']
          )}
          placeholder='Article text'
          defaultValue={slug ? data?.article?.body : ''}
          id='body'
          {...register('body')}
        />
        <p className={cls['article__input-error']}>
          {errors?.body?.message ||
            editError?.data.errors.body ||
            createError?.data.errors.body}
        </p>

        <p className={cls['article__input-label']}>Tags</p>
        <div className={cls.tags}>
          {fields.map((field, i) => {
            return (
              <section
                key={field.id}
                className={cls.tags__wrapper}
                name='tagList'
              >
                <input
                  className={classnames(
                    cls.tags__tag,
                    cls.article__input
                  )}
                  type='text'
                  name={field.name}
                  autoComplete='off'
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      append('', {
                        focusName: `tagList[${fields.length}]`,
                      });
                    }
                  }}
                  {...register(`tagList[${i}]`, { required: true })}
                />
                <button
                  type='button'
                  className={classnames(
                    cls.article__button,
                    cls.tags__button,
                    cls['tags__button--delete']
                  )}
                  onClick={() => remove(i)}
                >
                  Delete
                </button>
              </section>
            );
          })}
          <button
            type='button'
            className={classnames(
              cls.article__button,
              cls.tags__button,
              cls['tags__button--add']
            )}
            onClick={() =>
              append('', { focusName: `tagList[${fields.length}]` })
            }
          >
            Add Tag
          </button>
        </div>
        <p className={cls['article__input-error']}>
          {errors?.tagList?.message || errors?.tagList?.[0].message}
        </p>

        <button
          type='submit'
          className={classnames(
            cls['article__button--send'],
            cls.article__button,
            {
              [cls['article__button--send']]:
                editLoading || createLoading,
            }
          )}
        >
          Send
        </button>
      </RouterForm>
    </div>
  );
}
