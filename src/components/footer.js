import cx from "classnames";

export default function Footer({ auth = false, fluid = true }) {
  if (auth === true) fluid = false;
  return (
    <div className={cx("nk-footer", { "nk-auth-footer-full": auth })}>
      <div className={cx({ container: !fluid, "container-fluid": fluid })}>
        <div className="nk-footer-wrap">
          <div className="nk-footer-copyright">
            &copy; 2020 Dashlite. Made by{" "}
            <a
              href="https://samlovescoding.com"
              target="_blank"
              rel="noreferrer"
            >
              samlovescoding
            </a>
          </div>
          <div className="nk-footer-links">
            <ul className="nav nav-sm">
              <li className="nav-item">
                <a className="nav-link" href="#/">
                  Terms
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/">
                  Privacy
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/">
                  Help
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
