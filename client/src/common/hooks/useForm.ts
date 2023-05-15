import { useState } from "react";

const useForm = <T>(initialForm: T) => {
  const [form, setForm] = useState<T>(initialForm);
  const resetForm = () => setForm(initialForm);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value
      };
    });
  };
  return {
    form,
    resetForm,
    onChange
  };
};

export default useForm;

