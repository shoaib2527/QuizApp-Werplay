export const ValidateEmail = (email) => {
  if (email.length < 1)
    return { isValid: false, message: `Email cannot be empty.` }
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let isValid = re.test(String(email).trim().toLowerCase())
  return { isValid, message: isValid ? `Email is valid` : `Email is invalid` };
};
export const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}
export const shuffleArray = (array) => {
  var currentIndex = array.length, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}
