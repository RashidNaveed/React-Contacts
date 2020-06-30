export const phoneNumberValidation = {
  required: { value: true, message: 'Phone number is required' },
  pattern: {
    value: /^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{7})$/,
    message: 'Number should be like +12-123-1234567',
  },
};

export const emailValidation = {
  required: { value: true, message: 'Email is required' },
  pattern: {
    value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    message: 'Email should be like test12@test.com',
  },
};
