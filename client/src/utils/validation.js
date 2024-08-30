export const validateField = (name, value, rules) => {
  let error = "";

  if (rules.required && !value) {
    error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
  } else if (rules.minLength && value.length < rules.minLength) {
    error = `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least ${
      rules.minLength
    } characters`;
  }

  return error;
};

export const validateForm = (fields, rules) => {
  const errors = {};

  Object.keys(fields).forEach((field) => {
    const error = validateField(field, fields[field], rules[field]);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};
