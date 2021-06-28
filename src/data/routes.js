import AuthLogin from "../pages/auth/login";
import AuthRegister from "../pages/auth/register";
import AuthLogout from "../pages/auth/logout";
import Home from "../pages/dashboard/home";
import { Redirect } from "react-router";

function route(path, component, exact = true) {
  return { path, component, exact };
}

const routes = [
  route("/", () => <Redirect to="/login" />),
  route("/dashboard", Home),
  route("/login", AuthLogin),
  route("/register", AuthRegister),
  route("/logout", AuthLogout),
];

export default routes;
