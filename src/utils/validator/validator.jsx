export const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9](\.?[a-zA-Z0-9_%+-])*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;

  return emailRegex.test(email);
};

export const isValidPhone = (phone) => {
  return /^[0-9]{10}$/.test(phone); 
};

export const isValidName = (name) => {
  const nameRegex = /^[a-zA-Z\s.'-]{2,100}$/;
  return nameRegex.test(name); 
};

export const isValidPanCard = (pan) => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan.toUpperCase()); 
};
 
export const isValidAadhar = (aadhar) => {
  const aadharRegex = /^[2-9][0-9]{11}$/;
  return aadharRegex.test(aadhar);
};

export const isValidLicense = (license) => {
  const licenseRegex = /^[A-Z]{2}\d{2}\s?\d{4}\d{7}$/;
  return licenseRegex.test(license);
};

export const isValidPassword = (password) => {
 const licenseRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
 return licenseRegex.test(password);
};