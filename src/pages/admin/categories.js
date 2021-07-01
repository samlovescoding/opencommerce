import { ErrorMessage, Formik } from "formik";
import { useState } from "react";
import Dashboard from "../../layouts/dashboard";
import sweetError from "../../services/sweetError";
import * as yup from "yup";
import api from "../../services/api";
import { useEffect } from "react";

function CategoryRow({ category, categories, reloadCategories }) {
  async function onClickDelete() {
    try {
      await api.delete("/category/" + category._id);
      reloadCategories();
    } catch (e) {
      sweetError(e);
    }
  }

  let prepend = 0;
  let current = category;

  while (current.parent != null) {
    prepend++;
    current = categories.find((category) => category._id == current.parent);
  }

  return (
    <>
      <tr>
        <td>{category._id}</td>
        <td>
          {"—".repeat(prepend)} {category.name}
        </td>
        <td>
          <div>
            <button className="btn btn-danger btn-sm" onClick={onClickDelete}>
              Delete
            </button>
          </div>
        </td>
      </tr>
      {categories
        .filter((_) => _.parent === category._id)
        .map((category, index) => (
          <CategoryRow
            category={category}
            key={index}
            categories={categories}
            reloadCategories={reloadCategories}
          />
        ))}
    </>
  );
}

export default function SellerCategories() {
  const [categories, setCategories] = useState([]);

  const initialValues = {
    name: "",
    parent: "",
  };

  const validationSchema = yup.object({
    name: yup.string().required().min(3).label("Name"),
    parent: yup.string().label("Parent"),
  });

  useEffect(() => {
    loadCategories();
  }, []);

  async function onSubmitAddCategory(values, { resetForm }) {
    try {
      if (values.parent === "") {
        values.parent = null;
      }
      // setCategories([...categories, values]);
      await api.post("/category", values);
      loadCategories();
      resetForm();
    } catch (e) {
      sweetError(e);
    }
  }

  async function loadCategories() {
    try {
      const response = await api.get("/category");
      setCategories(response);
    } catch (e) {
      sweetError(e);
    }
  }

  return (
    <Dashboard>
      {/* <pre>{JSON.stringify(categories, null, 2)}</pre> */}
      <div className="card card-bordered">
        <div className="card-inner">
          <div className="card-title-group align-start mb-2">
            <div className="card-title">
              <h4 className="title">Categories</h4>
            </div>
          </div>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Category Name</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {categories
                .filter((category) => category.parent == null)
                .map((category, key) => (
                  <CategoryRow
                    index={key}
                    category={category}
                    categories={categories}
                    reloadCategories={loadCategories}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card card-bordered">
        <div className="card-inner">
          <div className="card-title-group align-start mb-2">
            <div className="card-title">
              <h4 className="title">Add a Category</h4>
            </div>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmitAddCategory}
            validationSchema={validationSchema}
          >
            {({ values, setFieldValue, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-4">
                    <input
                      className="form-control"
                      placeholder="Enter category name"
                      value={values.name}
                      onChange={(e) => setFieldValue("name", e.target.value)}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="col-4">
                    <select
                      className="form-control"
                      value={values.parent}
                      onChange={(e) => setFieldValue("parent", e.target.value)}
                    >
                      <option value="">Choose a Parent Category</option>
                      <option value="">None</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-4">
                    <button className="btn btn-primary btn-block" type="submit">
                      Add
                    </button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </Dashboard>
  );
}
