export const isAuthDataStored = () => {
  if (localStorage.getItem("token") !== null) {
    return true;
  } else {
    return false;
  }
};
