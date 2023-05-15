interface FormValidationInterface {
  [key: string]: string;
}

export const formValidation = (form: FormValidationInterface) => {
  const isNull = (field: string) => !field.trim().length;
  const errors: string[] = [];
  Object.entries(form).forEach(([key, value]) => {
    return isNull(value) ? errors.push(`${key} is empty`) : null;
  });

  if (form.email) {
    const isEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(form.email);
    if (!isEmail) {
      errors.push(`${form.email} is not coorect email`);
    }
  }

  return errors.length > 0 ? errors : null;
};

