import { Link, useHistory } from "react-router-dom";
import Auth from "../../../layouts/auth";
import { Formik } from "formik";
import AuthInput from "../../../components/auth-input";
import api from "../../../services/api";
import sweetError from "../../../services/sweetError";

export default function AdminRegister() {
  const history = useHistory();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  async function onSubmit(values) {
    try {
      await api.post("/admin/register", values);
      history.push("/admin/login");
    } catch (e) {
      sweetError(e);
    }
  }

  return (
    <Auth>
      <div className="card">
        <div className="card-inner card-inner-lg">
          <div className="nk-block-head">
            <div className="nk-block-head-content">
              <h4 className="nk-block-title">Admin Registration</h4>
            </div>
          </div>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <AuthInput
                  id="name"
                  label="Display Name"
                  placeholder="Enter your display name"
                />
                <AuthInput
                  id="email"
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                />
                <AuthInput
                  id="password"
                  label="Password"
                  helper={
                    <a
                      className="link link-primary link-sm"
                      href="/forgot-passowrd"
                    >
                      Forgot Password?
                    </a>
                  }
                  placeholder="Enter your password"
                  type="password"
                />
                <AuthInput
                  id="confirmPassword"
                  label="Confirm Password"
                  placeholder="Re-enter your password"
                  type="password"
                />
                <div className="form-group">
                  <button className="btn btn-lg btn-primary btn-block">
                    Create Account
                  </button>
                </div>
              </form>
            )}
          </Formik>
          <div className="form-note-s2 text-center pt-4">
            {" "}
            Already have an account ?{" "}
            <Link to="/admin/login">Sign in instead</Link>
          </div>
        </div>
      </div>
    </Auth>
  );
}
