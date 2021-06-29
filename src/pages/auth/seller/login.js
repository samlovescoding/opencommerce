import { Link, useHistory } from "react-router-dom";
import Auth from "../../../layouts/auth";
import AuthInput from "../../../components/auth-input";
import sweetError from "../../../services/sweetError";
import api from "../../../services/api";
import { Formik } from "formik";
import useUser from "../../../services/useUser";

export default function Login() {
  const history = useHistory();
  const { saveUser } = useUser();

  const initialValues = {
    email: "",
    password: "",
  };

  async function onSubmit(values) {
    try {
      const response = await api.post("/seller/login", values);
      api.interceptors.request.use((config) => {
        config.headers = { ...config.headers, authorization: response.token };
        return config;
      });
      saveUser(response);
      history.push("/seller");
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
              <h4 className="nk-block-title">Sign-In</h4>
              <div className="nk-block-des">
                <p>Access seller panel using your email and password</p>
              </div>
            </div>
          </div>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
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
                <div className="form-group">
                  <button className="btn btn-lg btn-primary btn-block">
                    Sign in
                  </button>
                </div>
              </form>
            )}
          </Formik>
          <div className="form-note-s2 text-center pt-4">
            {" "}
            New on our platform?{" "}
            <Link to="/seller/register">Create an account</Link>
          </div>
          <div className="text-center pt-4 pb-3">
            <h6 className="overline-title overline-title-sap">
              <span>OR</span>
            </h6>
          </div>
          <ul className="nav justify-center gx-4">
            <li className="nav-item">
              <a className="nav-link" href="#/facebook">
                Facebook
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/google">
                Google
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Auth>
  );
}
