import { Redirect } from "react-router";
import Seller from "../pages/seller";
import SellerProducts from "../pages/seller/products/view";
import SellerProductsCreate from "../pages/seller/products/create";
import SellerProductsEdit from "../pages/seller/products/edit";
import SellerLogin from "../pages/auth/seller/login";
import SellerRegister from "../pages/auth/seller/register";
import SellerChangePassword from "../pages/seller/password";
import SellerOrders from "../pages/seller/products/orders";
import SellerShop from "../pages/seller/products/shop";
import Logout from "../pages/auth/logout";
import AdminLogin from "../pages/auth/admin/login";
import AdminRegister from "../pages/auth/admin/register";
import AdminChangePassword from "../pages/admin/password";
import Admin from "../pages/admin";
import AdminSellers from "../pages/admin/sellers";
import AdminProducts from "../pages/admin/products";
import AdminOrders from "../pages/admin/orders";
import AdminCategories from "../pages/admin/categories";
import SellerCoupons from "../pages/seller/products/coupons";

function route(path, component, exact = true) {
  return { path, component, exact };
}

const routes = [
  route("/", () => <Redirect to="/seller/login" />),
  // route("/dashboard", Home),
  route("/seller/login", SellerLogin),
  route("/seller/register", SellerRegister),
  route("/seller/change-password", SellerChangePassword),
  route("/seller/products/view", SellerProducts),
  route("/seller/products/create", SellerProductsCreate),
  route("/seller/products/:id/edit", SellerProductsEdit),

  route("/seller/orders", SellerOrders),
  route("/seller/coupons", SellerCoupons),
  route("/seller/shop", SellerShop),
  route("/logout", Logout),
  route("/seller", Seller),

  // Admin
  route("/admin", Admin),
  route("/admin/sellers", AdminSellers),
  route("/admin/login", AdminLogin),
  route("/admin/products/view", AdminProducts),
  route("/admin/orders", AdminOrders),
  route("/admin/categories", AdminCategories),
  route("/admin/register", AdminRegister),
  route("/admin/change-password", AdminChangePassword),
];

export default routes;
