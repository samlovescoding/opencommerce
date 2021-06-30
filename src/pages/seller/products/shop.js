import Dashboard from "../../../layouts/dashboard";

export default function SellerShop() {
  return (
    <Dashboard>
      <div className="card-inner">
        <h5 className="card-title">Web Store Setting</h5>
        <p>Here is your basic store setting of your website.</p>

        <form action="#" className="gy-3 form-settings">
          <div className="row g-3 align-center">
            <div className="col-lg-5">
              <div className="form-group">
                <label className="form-label" for="site-name">
                  Store Name
                </label>
                <span className="form-note">
                  Specify the name of your website.
                </span>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="form-group">
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    id="site-name"
                    value="My Store"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row g-3 align-center">
            <div className="col-lg-5">
              <div className="form-group">
                <label className="form-label" for="site-email">
                  Site Email
                </label>
                <span className="form-note">
                  Specify the email address of your website.
                </span>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="form-group">
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    id="site-email"
                    value="info@softnio.com"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row g-3 align-center">
            <div className="col-lg-5">
              <div className="form-group">
                <label className="form-label" for="site-copyright">
                  Site Copyright
                </label>
                <span className="form-note">
                  Copyright information of your website.
                </span>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="form-group">
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    id="site-copyright"
                    value="© 2019, DashLite. All Rights Reserved."
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row g-3 align-center">
            <div className="col-lg-5">
              <div className="form-group">
                <label className="form-label">Website Link</label>
                <span className="form-note">
                  Specify the URL if your main website is external.
                </span>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="form-group">
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    name="site-url"
                    value="https://www.softnio.com"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-lg-7 offset-lg-5">
              <div className="form-group mt-2">
                <button type="submit" className="btn btn-lg btn-primary">
                  Update
                </button>
              </div>
            </div>
          </div>
        </form>

        <hr />

        <h5 className="card-title mt-5">Store Address</h5>
        <p>Here is your publicly accessible store address.</p>

        <form action="#" className="gy-3 form-settings">
          <div className="row g-3 align-center">
            <div className="col-lg-5">
              <div className="form-group">
                <label className="form-label" for="site-name">
                  Address Line 1
                </label>
                <span className="form-note">
                  Specify the name of your website.
                </span>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="form-group">
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    id="site-name"
                    value="My Store"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row g-3 align-center">
            <div className="col-lg-5">
              <div className="form-group">
                <label className="form-label" for="site-email">
                  Address Line 2
                </label>
                <span className="form-note">
                  Specify the email address of your website.
                </span>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="form-group">
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    id="site-email"
                    value="info@softnio.com"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row g-3 align-center">
            <div className="col-lg-5">
              <div className="form-group">
                <label className="form-label" for="site-copyright">
                  City
                </label>
                <span className="form-note">
                  Copyright information of your website.
                </span>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="form-group">
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    id="site-copyright"
                    value="© 2019, DashLite. All Rights Reserved."
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row g-3 align-center">
            <div className="col-lg-5">
              <div className="form-group">
                <label className="form-label">State</label>
                <span className="form-note">
                  Specify the URL if your main website is external.
                </span>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="form-group">
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    name="site-url"
                    value="https://www.softnio.com"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row g-3 align-center">
            <div className="col-lg-5">
              <div className="form-group">
                <label className="form-label">Country</label>
                <span className="form-note">
                  Specify the URL if your main website is external.
                </span>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="form-group">
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    name="site-url"
                    value="https://www.softnio.com"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row g-3 align-center">
            <div className="col-lg-5">
              <div className="form-group">
                <label className="form-label">Pincode</label>
                <span className="form-note">
                  Specify the URL if your main website is external.
                </span>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="form-group">
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    name="site-url"
                    value="https://www.softnio.com"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-lg-7 offset-lg-5">
              <div className="form-group mt-2">
                <button type="submit" className="btn btn-lg btn-primary">
                  Update
                </button>
              </div>
            </div>
          </div>
        </form>

        <hr />

        <h5 className="card-title mt-5">Payment Settings</h5>
        <p>Here are your Razorpay keys.</p>

        <form action="#" className="gy-3 form-settings">
          <div className="row g-3 align-center">
            <div className="col-lg-5">
              <div className="form-group">
                <label className="form-label" for="site-copyright">
                  City
                </label>
                <span className="form-note">
                  Copyright information of your website.
                </span>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="form-group">
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    id="site-copyright"
                    value="© 2019, DashLite. All Rights Reserved."
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row g-3 align-center">
            <div className="col-lg-5">
              <div className="form-group">
                <label className="form-label">State</label>
                <span className="form-note">
                  Specify the URL if your main website is external.
                </span>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="form-group">
                <div className="form-control-wrap">
                  <input
                    type="text"
                    className="form-control"
                    name="site-url"
                    value="https://www.softnio.com"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-lg-7 offset-lg-5">
              <div className="form-group mt-2">
                <button type="submit" className="btn btn-lg btn-primary">
                  Update
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Dashboard>
  );
}
