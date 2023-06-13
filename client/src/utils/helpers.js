//helper functions used for validation
export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function checkPassword(input) {
  //const passw = /^[A-Za-z]\w{7,14}$/;
  const passw = /^[A-Za-z]\w{2,14}$/;
  if (input.match(passw)) {
    return true;
  }
  return false;
}

export function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

//const { enAULocale } = require('date-fns/locale/en-AU');
const { isFuture } = require('date-fns');

//used in DayForm to ensure date entered is not in the future
export function checkIsValidDate(dateString) {
  let enteredDate = new Date(dateString)
  if (isFuture(enteredDate)){
    return false;
  } else {
    return true;
  }
}

