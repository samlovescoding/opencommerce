import Dashboard from "../../../layouts/dashboard";
import sweetError from "../../../services/sweetError";
import { Formik, ErrorMessage, Field } from "formik";
import { useState } from "react";
import api from "../../../services/api";
import { useEffect } from "react";
import swal from "sweetalert";

function SimpleInput({ id, placeholder, type = "text" }) {
  return (
    <>
      <Field
        type="text"
        name={id}
        placeholder={placeholder}
        className="form-control"
        id={id}
      />
      <ErrorMessage name={id} component="div" className="text-danger" />
    </>
  );
}

export default function SellerShop() {
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    copyright: "",
    link: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    razorpayClient: "",
    razorpaySecret: "",
  });

  useEffect(() => {
    loadShop();
  }, []);

  async function loadShop() {
    try {
      const shop = await api.get("/seller/shop");
      if (shop) setInitialValues(shop);
    } catch (e) {
      sweetError(e);
    }
  }

  async function onSubmit(values) {
    try {
      await api.patch("/seller/shop", values);
      swal({
        title: "Success",
        icon: "success",
        description: "Shop was updated.",
      });
    } catch (e) {
      sweetError(e);
    }
  }

  return (
    <Dashboard>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <form className="card-inner" onSubmit={handleSubmit}>
            <h5 className="card-title">Web Store Setting</h5>
            <p>Here is your basic store setting of your website.</p>
            <div className="gy-3 form-settings">
              <div className="row g-3 align-center">
                <div className="col-lg-5">
                  <div className="form-group">
                    <label className="form-label">Store Name</label>
                    <span className="form-note">
                      Specify the name of your website.
                    </span>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="form-group">
                    <div className="form-control-wrap">
                      <SimpleInput
                        id="name"
                        placeholder="Enter shop name here."
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row g-3 align-center">
                <div className="col-lg-5">
                  <div className="form-group">
                    <label className="form-label">Site Email</label>
                    <span className="form-note">
                      Specify the email address of your website.
                    </span>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="form-group">
                    <div className="form-control-wrap">
                      <SimpleInput
                        id="email"
                        placeholder="Enter shop email here."
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row g-3 align-center">
                <div className="col-lg-5">
                  <div className="form-group">
                    <label className="form-label">Site Copyright</label>
                    <span className="form-note">
                      Copyright information of your website.
                    </span>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="form-group">
                    <div className="form-control-wrap">
                      <SimpleInput
                        id="copyright"
                        placeholder="Enter copyright statement here."
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
                      <SimpleInput
                        id="link"
                        placeholder="Enter site website URL here."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr />

            <h5 className="card-title mt-5">Store Address</h5>
            <p>Here is your publicly accessible store address.</p>

            <div className="gy-3 form-settings">
              <div className="row g-3 align-center">
                <div className="col-lg-5">
                  <div className="form-group">
                    <label className="form-label">Address Line 1</label>
                    <span className="form-note">
                      Specify the house number and colony.
                    </span>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="form-group">
                    <div className="form-control-wrap">
                      <SimpleInput
                        id="addressLine1"
                        placeholder="Enter address line 1 here."
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row g-3 align-center">
                <div className="col-lg-5">
                  <div className="form-group">
                    <label className="form-label">Address Line 2</label>
                    <span className="form-note">
                      Specify any near landmarks.
                    </span>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="form-group">
                    <div className="form-control-wrap">
                      <SimpleInput
                        id="addressLine2"
                        placeholder="Enter address line 2 here."
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row g-3 align-center">
                <div className="col-lg-5">
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <span className="form-note">Specify the city.</span>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="form-group">
                    <div className="form-control-wrap">
                      <SimpleInput id="city" placeholder="Enter city here." />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row g-3 align-center">
                <div className="col-lg-5">
                  <div className="form-group">
                    <label className="form-label">State</label>
                    <span className="form-note">Specify the state.</span>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="form-group">
                    <div className="form-control-wrap">
                      <SimpleInput id="state" placeholder="Enter state here." />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row g-3 align-center">
                <div className="col-lg-5">
                  <div className="form-group">
                    <label className="form-label">Country</label>
                    <span className="form-note">Specify the country.</span>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="form-group">
                    <div className="form-control-wrap">
                      <SimpleInput
                        id="country"
                        placeholder="Enter country here."
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row g-3 align-center">
                <div className="col-lg-5">
                  <div className="form-group">
                    <label className="form-label">Pincode</label>
                    <span className="form-note">Specify of the address.</span>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="form-group">
                    <div className="form-control-wrap">
                      <SimpleInput
                        id="pincode"
                        placeholder="Enter pincode here."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr />

            <h5 className="card-title mt-5">Payment Settings</h5>
            <p>Here are your Razorpay keys.</p>

            <div className="gy-3 form-settings">
              <div className="row g-3 align-center">
                <div className="col-lg-5">
                  <div className="form-group">
                    <label className="form-label">Client ID</label>
                    <span className="form-note">
                      Paste your client id from razorpay.
                    </span>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="form-group">
                    <div className="form-control-wrap">
                      <SimpleInput
                        id="razorpayClient"
                        placeholder="Enter razorpay client here."
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row g-3 align-center">
                <div className="col-lg-5">
                  <div className="form-group">
                    <label className="form-label">Client Secret</label>
                    <span className="form-note">
                      Paste your client secret from razorpay.
                    </span>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="form-group">
                    <div className="form-control-wrap">
                      <SimpleInput
                        id="razorpaySecret"
                        placeholder="Enter razorpay secret here."
                      />
                    </div>
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
        )}
      </Formik>
    </Dashboard>
  );
}
