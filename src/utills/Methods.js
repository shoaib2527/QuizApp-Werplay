export const ValidateEmail = (email) => {
    if (email.length < 1)
      return { isValid: false, message: `Email cannot be empty.` }
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = re.test(String(email).trim().toLowerCase())
    return { isValid, message: isValid ? `Email is valid` : `Email is invalid` };
  };