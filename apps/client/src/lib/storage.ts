export const LOCALSTORAGE = {
  TOKEN: "token",
};

export const GET_TOKEN = () => {
  return localStorage.getItem(LOCALSTORAGE.TOKEN);
};
