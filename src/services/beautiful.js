export const role = (role) => {
  switch (role) {
    case "user":
      return "Customer";
    case "admin":
      return "Administrator";
    case "seller":
      return "Seller";
    default:
      return "Guest";
  }
};
