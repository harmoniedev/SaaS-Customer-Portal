const validateName = (name) => /^[а-яА-Яa-zA-Z._\s-]{2,30}$/.test(name);
const validateEmail = (email) =>
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);

export const checkValidateName = (name) => {
  let nameErrors = [];
  if (name === '') {
    nameErrors = [{ message: 'Please enter your first name' }];
  } else if (name?.length < 2) {
    nameErrors = [{ message: 'Too short' }];
  } else if (name?.length > 30) {
    nameErrors = [{ message: 'Too long' }];
  } else if (!validateName(name)) {
    nameErrors = [{ message: 'Enter a valid first name' }];
  } else if (name.match(/^\s+$/) !== null) {
    nameErrors = [{ message: 'First name has blank spaces' }];
  } else {
    nameErrors = [];
  }
  return nameErrors;
};
export const checkValidateSurname = (surname) => {
  let familyErrors = [];
  if (surname === '') {
    familyErrors = [{ message: 'Please enter your last name' }];
  } else if (surname?.length < 2) {
    familyErrors = [{ message: 'Too short' }];
  } else if (surname?.length > 30) {
    familyErrors = [{ message: 'Too long' }];
  } else if (!validateName(surname)) {
    familyErrors = [{ message: 'Enter a valid last name' }];
  } else if (surname.match(/^\s+$/) !== null) {
    familyErrors = [{ message: 'Last name has blank spaces' }];
  } else {
    familyErrors = [];
  }
  return familyErrors;
};

export const checkValidateEmail = (email) => {
  let emailErrors = [];
  if (email === '') {
    emailErrors = [{ message: 'Please enter your email' }];
  } else if (!validateEmail(email)) {
    emailErrors = [{ message: 'Enter a valid email' }];
  } else {
    emailErrors = [];
  }
  return emailErrors;
};
