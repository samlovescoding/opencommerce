import Dashboard from "../../layouts/dashboard";
import { Formik } from "formik";
import Input from "../../components/input";
import api from "../../services/api";
import sweetError from "../../services/sweetError";
import * as yup from "yup";
import swal from "sweetalert";

export default function ChangePassword() {
  const initialValues = {
    currentPassword: "",
    password: "",
    passwordConfirm: "",
  };

  const validationSchema = yup.object({
    currentPassword: yup
      .string()
      .required()
      .min(8)
      .max(64)
      .label("Current Password"),
    password: yup.string().required().min(8).max(64).label("New Password"),
    passwordConfirm: yup
      .string()
      .required()
      .min(8)
      .max(64)
      .oneOf([yup.ref("password"), null], "New password does not match")
      .label("New Password Confirmation"),
  });

  async function onSubmit(values) {
    try {
      await api.patch("/admin/change-password", values);
      swal({
        title: "Success",
        text: "Password is updated!",
        icon: "success",
      });
    } catch (e) {
      sweetError(e);
    }
  }

  return (
    <Dashboard>
      <div className="card card-bordered">
        <div className="card-inner">
          <div className="card-title-group align-start mb-2">
            <div className="card-title">
              <h4 className="title">Change Password</h4>
            </div>
          </div>
          <div>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Input
                    id="currentPassword"
                    label="Current Password"
                    placeholder="Enter the current password here"
                    type="password"
                  />
                  <Input
                    id="password"
                    label="New Password"
                    placeholder="Enter the new password here"
                    type="password"
                  />
                  <Input
                    id="passwordConfirm"
                    label="Confirm Current Password"
                    placeholder="Re-enter the new password"
                    type="password"
                  />
                  <div className="form-group">
                    <button className="btn btn-primary">Change</button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}
