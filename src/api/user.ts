const _url = "users";

export const getUsers = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/${_url}`, {
    method: "GET",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
  });
};
