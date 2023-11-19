import { useCallback, useState } from "react";

export default function useValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target; // name = email, value = example@mail.ru
    setValues({...values, [name]: value}); // { email: example@mail.ru, ... }
    setErrors({...errors, [name]: e.target.validationMessage }); // { email: 'ошибка', }
    setIsValid(e.target.closest('form').checkValidity()); // true/false
  };

  const resetForm = useCallback(() => {
    setValues({});
    setErrors({});
    setIsValid(false);
  }, [setValues, setErrors, setIsValid]);

  return { values, errors, isValid, handleChange, resetForm };
}
