import SellerLogin from "../pages/auth/seller/login";
import SellerRegister from "../pages/auth/seller/register";
import SellerChangePassword from "../pages/seller/password";
import Logout from "../pages/auth/logout";
import Seller from "../pages/seller";
import Home from "../pages/dashboard/home";
import { Redirect } from "react-router";
import SellerProducts from "../pages/seller/products/view";
import SellerProductsCreate from "../pages/seller/products/create";
import SellerProductsEdit from "../pages/seller/products/edit";

function route(path, component, exact = true) {
  return { path, component, exact };
}

const routes = [
  route("/", () => <Redirect to="/seller/login" />),
  route("/dashboard", Home),
  route("/seller/login", SellerLogin),
  route("/seller/register", SellerRegister),
  route("/seller/change-password", SellerChangePassword),
  route("/seller/products", SellerProducts),
  route("/seller/products/create", SellerProductsCreate),
  route("/seller/products/:id/edit", SellerProductsEdit),
  route("/logout", Logout),
  route("/seller", Seller),
];

export default routes;
