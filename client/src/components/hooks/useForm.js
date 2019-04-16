import { useState, } from "react";

export const useForm = (callback) => {
  const [values, setValues] = useState({});

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    callback(e);
  };

  const handleChange = (e, attrs) => {
    e.persist();
    let name = attrs ? attrs.name : e.target.value;
    let value = attrs ? attrs.value : e.target.value;
    setValues(values => ({ ...values, [name]: value, }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    setValues,
  };
};

export default useForm;