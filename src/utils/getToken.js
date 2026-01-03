export const getToken = () => {
  return (
    localStorage.getItem("admin_token") ||
    sessionStorage.getItem("admin_token")
  );
};
