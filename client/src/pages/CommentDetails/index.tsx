import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { commentService } from './../../services/comment.service';
import useFetch from './../../common/hooks/useFetch';
import Comment from '../../components/Comment';
import Loader from '../../components/Loader';
import styles from './styles.module.scss';
import {
  CommentInterface,
  CreateCommentInterface,
} from './../../types/comment.interfaces';

const CommentDetails = () => {
  const { commentId } = useParams();
  const fetchFunc = useCallback(
    () => commentService.fetchComment(commentId as string),
    [commentId],
  );
  const { loading, data, error } = useFetch<null | CommentInterface>(fetchFunc);
  const [comment, setComment] = useState<null | CommentInterface>(null);

  const handlerCreateComment = async (comment: CreateCommentInterface) => {
    try {
      await commentService.createComment(comment);
      window.location.reload();
    } catch (error) {
      const err = error as Error;
      alert(err.message);
    }
  };

  useEffect(() => {
    if (data) {
      setComment(data);
    }
  }, [data]);

  const renderReplies = (replies: CommentInterface[], margin: number) => {
    return !replies.length
      ? null
      : replies.map((child) => (
          <div style={{ marginLeft: `${margin}px` }} key={child.id}>
            <div className={styles.replyComment}>
              <Comment comment={child} onCreateComment={handlerCreateComment} />
            </div>
            {renderReplies(child.replies, margin + 30)}
          </div>
        ));
  };

  if (error) {
    return <p>{error.message}</p>;
  }

  if (loading || !comment) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <div>
        <Comment comment={comment} onCreateComment={handlerCreateComment} />
        {comment.replies.length ? <p>Replies</p> : null}
        {renderReplies(comment.replies, 30)}
      </div>
    </div>
  );
};

export default CommentDetails;
