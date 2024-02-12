/**
 * Validates an email address.
 *
 * @function
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if the email address is valid, false otherwise.
 */
const emailValidation = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

/**
 * Validates a password.
 *
 * @function
 * @param {string} password - The password to validate.
 * @returns {boolean} True if the password is valid (at least 8 characters), false otherwise.
 */
const passwordValidation = (password) => {
  // Add custom password validation lines
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*?-]).{8,}$/;
  return passwordRegex.test(password);
};

const routeIdValidation = (links) => {
  // Assuming the links have a pattern like /route/view/{ID}/...
  const idRegex = /\/route\/view\/(\d+)/g;
  const matches = links.match(idRegex);

  // Extract the IDs from the matches
  const ids = matches ? matches.map((match) => match.split("/").pop()) : [];
  return ids;
};

const phoneValidation = (phone) => {
  phone = phone.replace(/\s/g, "");
  const phoneRegex = /^(\+32\d{9}|\+320\d{9})$/;
  return phoneRegex.test(phone);
};

const streetNameValidation = (streetname) => {
  const streetnameRegex = /^[a-zA-Z\s\u00C0-\u017F]+$/;
  return streetnameRegex.test(streetname);
};

const houseNumberValidation = (housenumber) => {
  const housenumberRegex = /^[0-9]+[a-zA-Z]*$/;
  return housenumberRegex.test(housenumber);
};

const postalCodeValidation = (postalcode) => {
  const postalcodeRegex = /^[0-9]{4}$/;
  return postalcodeRegex.test(postalcode);
};

const cityValidation = (city) => {
  const cityRegex = /^[a-zA-Z\s\u00C0-\u017F]+$/;
  return cityRegex.test(city);
};

const hasErrors = (errors) => {
  return Object.values(errors).some((err) => err);
}

export {
  emailValidation,
  passwordValidation,
  routeIdValidation,
  phoneValidation,
  streetNameValidation,
  houseNumberValidation,
  postalCodeValidation,
  cityValidation,
  hasErrors,
};
