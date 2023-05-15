import React, { useState } from "react";

import { formValidation } from "./../../common/utils/form.validation";
import { CreateCommentInterface } from "./../../types/comment.interfaces";
import useForm from "./../../common/hooks/useForm";
import styles from "./styles.module.scss";
import Comment from "../Comment";

interface IProps {
  parent?: null | number;
  onSubmit: (newComment: CreateCommentInterface) => Promise<void>;
}

const initialForm = {
  userName: "",
  email: "",
  text: ""
};

const CreateComment = ({ parent = null, onSubmit }: IProps) => {
  const { form, onChange, resetForm } = useForm(initialForm);
  const [file, setFile] = useState<File>();
  const [commentPreview, setCommentPreview] = useState(false);
  const [formErrors, setFormErrors] = useState<null | string[]>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCommentPreview(false);
      setFile(e.target.files[0]);
    }
  };

  const handlerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      return;
    }

    const newComment: CreateCommentInterface = { ...form };
    if (file) {
      newComment.file = file;
    }

    if (parent) {
      newComment.parent = parent;
    }

    onSubmit(newComment);
  };

  const validateForm = () => {
    const errors = formValidation(form);
    setFormErrors(errors);
    return errors;
  };

  const handlerPreviewOpen = () => {
    if (initialForm === form) {
      return;
    }

    if (validateForm()) {
      return;
    }

    setCommentPreview(true);
  };

  const handlerFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCommentPreview(false);
    setFormErrors(null);
    onChange(event);
  };

  const renderErrors = (errors: string[]) => {
    return errors.map((err) => (
      <p className={styles.errors__item} key={err}>
        {err}
      </p>
    ));
  };

  return (
    <div>
      {formErrors ? (
        <div className={styles.errors}>{renderErrors(formErrors)}</div>
      ) : null}
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <label className={styles.form__field}>
          <p>User Name</p>
          <input
            type="text"
            name="userName"
            // required
            value={form.userName}
            onChange={handlerFormChange}
            className={styles.form__input}
          />
        </label>
        <label className={styles.form__field}>
          <p>User Email</p>
          <input
            type="email"
            name="email"
            // required
            value={form.email}
            onChange={handlerFormChange}
            className={styles.form__input}
          />
        </label>
        <label className={styles.form__field}>
          <p>Comment text</p>
          <textarea
            className={styles.form__area}
            rows={4}
            name="text"
            //  required
            value={form.text}
            onChange={handlerFormChange}
          />
        </label>
        <label className={styles.form__field}>
          <p>Add image or txt file</p>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/jpeg, image/png, image/jpg, image/png, image/gif, text/plain"
          />
        </label>
        <div className={styles.form__controls}>
          <button onClick={handlerSubmit}>Send</button>
          <button onClick={handlerPreviewOpen}>Preview comment</button>
        </div>
      </form>

      {commentPreview ? (
        <div className={styles.preview}>
          <p className={styles.preview__title}>
            You can look at you post before it will be sent
          </p>
          <Comment
            mode="preview"
            comment={{
              id: 1,
              updatedAt: new Date(),
              text: form.text,
              createdAt: new Date(),
              replies: [],
              upload: file
                ? {
                    id: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    mimeType: file.type,
                    path: URL.createObjectURL(file)
                  }
                : null,
              user: {
                email: form.email,
                userName: form.userName,
                id: 1,
                createdAt: new Date(),
                updatedAt: new Date()
              }
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default CreateComment;

