import Joi from 'joi-browser';

export const validateSubmit = (data, Schema) => {
  const options = { abortEarly: false };
  const { error } = Joi.validate(data, Schema, options);

  if (!error) return null;

  const errors = {};
  for (let item of error.details) errors[item.path[0]] = item.message;
  return errors;
};

export const validateProperty = (name, value, Schema) => {
  const obj = { [name]: value };
  const subSchema = { [name]: Schema[name] };
  const { error } = Joi.validate(obj, subSchema);
  return error ? error.details[0].message : null;
};
