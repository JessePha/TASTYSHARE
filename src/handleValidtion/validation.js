export const isValidfName = (value) => {
  if (value.trim()) return { isValid: true, msg: "" };
  else return { isValid: false, msg: "Please enter your name" };
};
export const isValidlName = (value) => {
  if (value.trim()) return { isValid: true, msg: "" };
  else return { isValid: false, msg: "Please enter your last name" };
};
export const isValidEmail = (value) => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (value) {
    if (reg.test(value.trim())) return { isValid: true, msg: "" };
    else return { isValid: false, msg: "Invalid email address" };
  } else return { isValid: false, msg: "Please enter your email" };
};
export const isValidPasswordRegister = (value) => {
  const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
  if (value) {
    if (reg.test(value.trim())) return { isValid: true, msg: "" };
    else
      return {
        isValid: false,
        msg:
          "Your password should contain atleast a capital letter, small letter and numbers",
      };
  } else return { isValid: false, msg: "Please enter your password" };
};
export const isValidPasswordLogin = (value) => {
  if (value) {
    return { isValid: true, msg: "" };
  } else return { isValid: false, msg: "Please enter your password" };
};
