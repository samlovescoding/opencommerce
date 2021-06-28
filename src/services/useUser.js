const getUser = () => {
  const userJSON = localStorage.getItem("user");
  if (userJSON) {
    return JSON.parse(userJSON);
  }
  return false;
};

const hasUser = () => {
  const userJSON = localStorage.getItem("user");
  if (userJSON) {
    return true;
  }
  return false;
};

const saveUser = (user) => {
  const userJSON = JSON.stringify(user);
  localStorage.setItem("user", userJSON);
};

const deleteUser = () => {
  localStorage.removeItem("user");
};

const useUser = () => {
  return {
    user: getUser(),
    userExists: hasUser(),
    getUser,
    saveUser,
    hasUser,
    deleteUser,
  };
};

export default useUser;
