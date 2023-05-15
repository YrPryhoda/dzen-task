import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

import arrowDownImg from '../../assets/images/down-arrow.svg';
import arrowUpImg from '../../assets/images/up-arrow.svg';

import { dateFormatter } from '../../common/helpers/date.formatter';
import { CommentInterface } from '../../types/comment.interfaces';
import { commentService } from '../../services/comment.service';
import { Pagination } from '../../components/Pagination';
import useFetch from '../../common/hooks/useFetch';
import Loader from '../../components/Loader';
import styles from './styles.module.scss';

const ITEMS_PER_PAGE = 25;

const Home = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [sortField, setSortField] = useState('createdAt');
  const [commentsCount, setCommentsCount] = useState(0);
  const [comments, setComments] = useState<null | CommentInterface[]>(null);

  const handlerSortComments = async (sortField: string) => {
    setSortField(sortField);
    const newState = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newState);
  };

  const fatchFunc = useCallback(
    () =>
      commentService.fetchComments({
        skip: page,
        sortField,
        direction: sortDirection,
      }),
    [page, sortField, sortDirection],
  );

  const { loading, setLoading, error, data } = useFetch<{
    comments: CommentInterface[];
    count: number;
  } | null>(fatchFunc);
  const pagesCount = useMemo(
    () => Math.ceil(commentsCount / ITEMS_PER_PAGE),
    [commentsCount],
  );

  useEffect(() => {
    if (data) {
      setCommentsCount(data.count);
      setComments(data.comments);
    }
  }, [data]);

  const renderArrow = (fieldName: string) => {
    if (fieldName !== sortField) {
      return;
    }

    return (
      <img
        alt="Detect Sort Column"
        src={sortDirection === 'asc' ? arrowDownImg : arrowUpImg}
        className={styles.list__arrow}
      />
    );
  };

  if (error) {
    return <p>{error.message}</p>;
  }

  if (loading || !comments) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Root comments list</h2>
      <div className={styles.table}>
        <table className={styles.list}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Text</th>
              <th
                onClick={() => handlerSortComments('email')}
                className={styles.list__sortColumn}
              >
                Email
                {renderArrow('email')}
              </th>
              <th
                onClick={() => handlerSortComments('userName')}
                className={styles.list__sortColumn}
              >
                Username
                {renderArrow('userName')}
              </th>
              <th>
                Replies <br />
                count
              </th>
              <th
                onClick={() => handlerSortComments('createdAt')}
                className={styles.list__sortColumn}
              >
                Created At
                {renderArrow('createdAt')}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!comments.length ? (
              <tr>
                <td colSpan={7} className={styles.list__empty}>
                  Empty table
                </td>
              </tr>
            ) : (
              comments.map((el) => (
                <tr className={styles.list__row} key={el.id}>
                  <td>{el.id}</td>
                  <td className={`${styles.list__text} ${styles.list_break}`}>
                    {el.text}
                  </td>
                  <td className={styles.list_break}>{el.user.email}</td>
                  <td className={styles.list_break}>{el.user.userName}</td>
                  <td>{el.replies.length}</td>
                  <td className={styles.list_break}>
                    {dateFormatter(el.createdAt)}
                  </td>
                  <td>
                    <NavLink to={`/comment/${el.id}`}>
                      <button> View</button>
                    </NavLink>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <Pagination totalCount={pagesCount} />
      </div>
    </div>
  );
};

export default Home;
