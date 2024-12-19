import { Pagination, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import ArticlePreview from '../ArticlePreview';
import {
  setPage,
  setPageSize,
} from '../../redux/slices/paginationSlice';
import { useGetArticlesQuery } from '../../redux/slices/apiSlice';
import ErrorPage from '../ErrorPage';

export default function ArticlesList() {
  const dispatch = useDispatch();

  const page = useSelector((state) => state.pagination.page);
  const pageSize = useSelector((state) => state.pagination.pageSize);

  const { data, isFetching, isError } = useGetArticlesQuery(
    {
      limit: pageSize,
      offset: page * pageSize - pageSize,
    },
    undefined
  );

  if (isError) return <ErrorPage />;
  return (
    <>
      {isFetching ? (
        <Spin
          size='large'
          style={{
            position: 'fixed',
            left: '50%',
            top: '50%',
            zIndex: 100,
          }}
        />
      ) : null}
      {data ? (
        <>
          {data.articles.map((article) => {
            return (
              <ArticlePreview
                article={article}
                key={
                  article.slug +
                  article.createdAt +
                  article.author.username
                }
              />
            );
          })}
          <Pagination
            align='center'
            hideOnSinglePage={false}
            showSizeChanger
            pageSizeOptions={[2, 5, 20]}
            pageSize={pageSize}
            defaultCurrent={1}
            total={data.articlesCount}
            current={page}
            style={{ margin: '10px auto' }}
            onChange={(pg, pgSize) => {
              dispatch(setPage(pg));
              dispatch(setPageSize(pgSize));
            }}
          />
        </>
      ) : (
        <Spin
          size='large'
          style={{
            position: 'fixed',
            left: '50%',
            top: '50%',
            zIndex: 100,
          }}
        />
      )}
    </>
  );
}
