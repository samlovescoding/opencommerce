function link(
  title,
  icon,
  to = "#/",
  children = null,
  badge = null,
  admin = false
) {
  return { title, icon, to, children, badge, heading: false, admin };
}

function heading(title, admin) {
  return { title, heading: true, admin };
}

const sidebar = [
  link("Dashboard", "layout-fill", "#"),

  heading("Heading"),
  link("Item 1", "user-alt-fill", "#"),
  link("Item 2", "list-fill", "#"),
  link("Menu", "star-fill", "#", [
    link("Sub Menu 1", "menu-circled", "#"),
    link("Sub Menu 2", "video-fill", "#"),
    link("Sub Menu 3", "video", "#"),
  ]),
  heading("Account"),
  link("Change Password", "shield-star-fill", "#"),
  link("Logout", "signout", "#"),
];

export default sidebar;
