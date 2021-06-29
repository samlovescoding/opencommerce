function link(title, icon, to = "#/", children = null, type = "user") {
  return { title, icon, to, children, badge: null, heading: false, type };
}

function heading(title, admin) {
  return { title, heading: true, admin };
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

const sidebar = [
  link("Dashboard", "layout-fill", "#"),

  heading("Products"),
  seller("Catalog", "bag-fill", "/seller/products/view"),
  seller("Add Product", "plus-circle-fill", "/seller/products/create"),
  seller("Categories", "filter-fill", "/seller/categories"),
  link("Orders", "list-thumb-alt-fill", "/seller/orders"),
  seller("Shop", "building-fill", "/seller/shop"),

  // heading("Orders"),
  // link("Menu", "star-fill", "#", [
  //   link("Sub Menu 1", "menu-circled", "#"),
  //   link("Sub Menu 2", "video-fill", "#"),
  //   link("Sub Menu 3", "video", "#"),
  // ]),

  heading("Account"),
  seller("Change Password", "shield-star-fill", "/seller/change-password"),
  link("Logout", "signout", "/logout"),
];

export default sidebar;
