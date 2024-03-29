function link(title, icon, to = "#/", children = null, type = "user") {
  return { title, icon, to, children, badge: null, heading: false, type };
}

function heading(title, type = "user") {
  return { title, heading: true, type };
}

function seller(title, icon, to = "#/", children = null) {
  return {
    title,
    icon,
    to,
    children,
    badge: null,
    heading: false,
    type: "seller",
  };
}

function admin(title, icon, to = "#/", children = null) {
  return {
    title,
    icon,
    to,
    children,
    badge: null,
    heading: false,
    type: "admin",
  };
}

const sidebar = [
  seller("Dashboard", "layout-fill", "/seller"),
  admin("Dashboard", "layout-fill", "/admin"),

  heading("Products"),
  seller("Catalog", "bag-fill", "/seller/products/view"),
  seller("Add Product", "plus-circle-fill", "/seller/products/create"),
  seller("Orders", "list-thumb-alt-fill", "/seller/orders"),
  seller("Shop", "building-fill", "/seller/shop"),
  admin("Products", "bag-fill", "/admin/products/view"),
  admin("Categories", "filter-fill", "/admin/categories"),
  admin("Orders", "list-thumb-alt-fill", "/admin/orders"),

  heading("Sellers", "admin"),
  admin("Accounts", "users-fill", "/admin/sellers"),
  seller("Coupons", "target", "/seller/coupons"),

  // heading("Orders"),
  // link("Menu", "star-fill", "#", [
  //   link("Sub Menu 1", "menu-circled", "#"),
  //   link("Sub Menu 2", "video-fill", "#"),
  //   link("Sub Menu 3", "video", "#"),
  // ]),

  heading("Account"),
  seller("Change Password", "shield-star-fill", "/seller/change-password"),
  admin("Change Password", "shield-star-fill", "/admin/change-password"),
  link("Logout", "signout", "/logout"),
];

export default sidebar;
