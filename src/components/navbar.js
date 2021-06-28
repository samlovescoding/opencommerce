import { role as beautifulRole } from "../services/beautiful";
import useUser from "../services/useUser";

export default function Navbar({ setSidebar, sidebar }) {
  const { user } = useUser();

  return (
    <div className="nk-header nk-header-fixed is-light">
      <div className="container-fluid">
        <div className="nk-header-wrap">
          <div className="nk-menu-trigger d-xl-none ml-n1">
            <a
              href="#/"
              className="nk-nav-toggle nk-quick-nav-icon"
              data-target="sidebarMenu"
              onClick={(e) => {
                e.preventDefault();

                setSidebar(true);
              }}
            >
              <em className="icon ni ni-menu"></em>
            </a>
          </div>
          <div className="nk-header-brand d-xl-none">
            <a href="/" className="logo-link">
              <img
                className="logo-light logo-img"
                src="/images/logo.png"
                alt="logo"
              />
              <img
                className="logo-dark logo-img"
                src="/images/logo-dark.png"
                alt="logo-dark"
              />
            </a>
          </div>

          <div className="nk-header-tools">
            <ul className="nk-quick-nav">
              <li>
                <a href="/password">
                  <div className="user-toggle">
                    <div className="user-avatar sm">
                      <em className="icon ni ni-user-alt"></em>
                    </div>
                    <div className="user-info d-none d-md-block">
                      <div className="user-status">
                        {beautifulRole(user.role) || "Guest"}
                      </div>
                      <div className="user-name">
                        {user.name || "Unknown User"}
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
