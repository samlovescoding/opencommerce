import { Redirect } from "react-router";
import Home from "../pages/dashboard/home";
import Seller from "../pages/seller";
import SellerProducts from "../pages/seller/products/view";
import SellerProductsCreate from "../pages/seller/products/create";
import SellerProductsEdit from "../pages/seller/products/edit";
import SellerLogin from "../pages/auth/seller/login";
import SellerRegister from "../pages/auth/seller/register";
import SellerChangePassword from "../pages/seller/password";
import SellerOrders from "../pages/seller/products/orders";
import SellerCategories from "../pages/seller/products/categories";
import SellerShop from "../pages/seller/products/shop";
import Logout from "../pages/auth/logout";

function route(path, component, exact = true) {
  return { path, component, exact };
}

const routes = [
  route("/", () => <Redirect to="/seller/login" />),
  route("/dashboard", Home),
  route("/seller/login", SellerLogin),
  route("/seller/register", SellerRegister),
  route("/seller/change-password", SellerChangePassword),
  route("/seller/products/view", SellerProducts),
  route("/seller/products/create", SellerProductsCreate),
  route("/seller/products/:id/edit", SellerProductsEdit),
  route("/seller/categories", SellerCategories),
  route("/seller/orders", SellerOrders),
  route("/seller/shop", SellerShop),
  route("/logout", Logout),
  route("/seller", Seller),
];

export default routes;
