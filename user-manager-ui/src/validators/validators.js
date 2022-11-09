export const validateEmptyData = (data) => {
  if (data.trim().length === 0) return false;
  return true;
};

export const validateContact = (data) => {
  let regex = /^\d{10}$/;
  return regex.test(data);
};

export const validatePassword = (data) => {
  if (data.trim().length < 8) return false;
  return true;
};

export const validateDropdown = (data, values) => {
  for (let i = 0; i < values.length; i++) {
    if (values[i].name === data) return false;
  }
  return true;
};

export const validateNegativeAmount = (data) => {
  if (data <= 0) return false;
  return true;
};

export const validateTransactionAmount = (data, balance) => {
  if (data > balance) return false;
  return true;
};
//validate loan amount
export const validateLoanAmount = (data) => {
  if (parseInt(data) > 100000 || parseInt(data) < 0) return false;
  return true;
};
