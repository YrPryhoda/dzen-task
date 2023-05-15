import DownloadLink from 'react-download-link';
import React, { useMemo, useState } from 'react';

import { dateFormatter } from './../../common/helpers/date.formatter';
import { fileDownload } from '../../common/helpers/file.download';
import avatarImg from '../../assets/images/icon.webp';
import CreateComment from '../CreateComment';
import styles from './styles.module.scss';
import Lightbox from '../Lightbox';
import {
  CommentInterface,
  CreateCommentInterface,
} from './../../types/comment.interfaces';

interface IProps {
  comment: CommentInterface;
  mode?: 'preview' | 'uploaded';
  onCreateComment?: (comment: CreateCommentInterface) => Promise<void>;
}

const Comment = ({ comment, onCreateComment, mode = 'uploaded' }: IProps) => {
  const [isLightboxOpen, setLightboxOpen] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);
  const handlerLightboxClose = () => setLightboxOpen(false);

  const handlerCreateComment = async (comment: CreateCommentInterface) => {
    if (!onCreateComment) {
      return;
    }
    onCreateComment(comment).then(() => {
      setReplyOpen(false);
    });
  };

  const renderImg = () => {
    if (!comment.upload) {
      return;
    }

    const src =
      mode === 'preview'
        ? comment.upload.path
        : `${process.env.REACT_APP_WEB_URL}/api/upload/${comment.upload.path}`;

    const alt = comment.upload.createdAt.toString();

    if (comment.upload.mimeType.includes('image/')) {
      return (
        <div>
          <img
            src={src}
            alt={alt}
            className={styles.comment__imgPreview}
            onClick={() => setLightboxOpen(true)}
          />
          <Lightbox
            isOpen={isLightboxOpen}
            onClose={handlerLightboxClose}
            image={{
              src,
              alt,
            }}
          />
        </div>
      );
    }

    if (comment.upload.mimeType.includes('text/')) {
      return (
        <DownloadLink
          label="Save txt file"
          filename={comment.upload.path}
          exportFile={async () => (await fileDownload(src)) || null}
        />
      );
    }

    return;
  };

  const withReply = useMemo(
    () => onCreateComment && mode === 'uploaded',
    [onCreateComment, mode],
  );

  return (
    <div className={styles.comment}>
      <div className={styles.comment__header}>
        <div className={styles.comment__userInfo}>
          <img src={avatarImg} alt="icon" className={styles.comment__avatar} />
          <p>{comment.user.userName}</p>
        </div>
        <p>{dateFormatter(comment.createdAt)}</p>
      </div>
      <div className={styles.comment__text}>
        <p> {comment.text}</p>
        {renderImg()}
        {withReply ? (
          <button
            className={styles.comment__replyBtn}
            onClick={() => setReplyOpen(true)}
          >
            Reply
          </button>
        ) : null}
      </div>
      {withReply && replyOpen ? (
        <div className={styles.comment__replyBlock}>
          <CreateComment parent={comment.id} onSubmit={handlerCreateComment} />
        </div>
      ) : null}
    </div>
  );
};

export default Comment;
