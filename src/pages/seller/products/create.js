import { Formik } from "formik";
import Input from "../../../components/input";
import api from "../../../services/api";
import sweetError from "../../../services/sweetError";
import Dashboard from "../../../layouts/dashboard";
import cx from "classnames";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function SellerProductsCreate() {
  const history = useHistory();
  const [attributeName, setAttributeName] = useState("");
  const [attributeValue, setAttributeValue] = useState("");

  const initialValues = {
    name: "",
    tags: [],
    description: "",
    image: null,
    tax: {
      status: true,
      percentage: 18,
    },
    price: {
      regular: 100,
      sale: 90,
    },
    inventory: { SKU: "", quantity: 1 },
    shipping: {
      weight: 0,
      length: 0,
      breadth: 0,
      height: 0,
      price: 0,
    },
    attributes: [],
  };

  async function onSubmit(values) {
    try {
      await api.post("/product", values);
      history.push("/seller/products/view");
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
              <h4 className="title">Add Product</h4>
            </div>
          </div>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ handleSubmit, setFieldValue, values }) => (
              <form onSubmit={handleSubmit}>
                <Input
                  id="name"
                  label="Name"
                  placeholder="Enter your name here"
                />
                <Input
                  id="tags"
                  label="Tags"
                  placeholder="Enter tags seperated with comma"
                />
                <div className="form-group">
                  <label>Description</label>

                  <MDEditor
                    value={values.description}
                    onChange={(description) =>
                      setFieldValue("description", description)
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Product Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={async (e) => {
                      try {
                        if (e.target.files[0]) {
                          const payload = new FormData();
                          payload.append("file", e.target.files[0]);
                          const { path } = await api.post("/image", payload);
                          setFieldValue("image", path);
                        }
                      } catch (e) {
                        sweetError(e);
                      }
                    }}
                  />
                </div>
                <h6 className="title mt-5">Product Pricing</h6>
                <Input
                  id="price.regular"
                  label="Regular Price"
                  placeholder="Enter regular price"
                />
                <Input
                  id="price.sale"
                  label="Sale Price"
                  placeholder="Enter sale price"
                />

                <div className="form-group">
                  <div>
                    <label>Discount</label>
                  </div>
                  <input
                    type="text"
                    disabled={true}
                    className="form-control"
                    value={
                      (
                        (values.price.sale / values.price.regular) *
                        100
                      ).toFixed(2) + "%"
                    }
                  />
                </div>

                <div className="form-group">
                  <div>
                    <label>Is Product Taxable</label>
                  </div>
                  <div className="btn-group">
                    <button
                      type="button"
                      className={cx(
                        "btn",
                        {
                          "btn-primary": values.tax.status,
                        },
                        {
                          "btn-outline-primary": !values.tax.status,
                        }
                      )}
                      onClick={() => {
                        setFieldValue("tax.status", true);
                      }}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className={cx(
                        "btn",
                        {
                          "btn-primary": !values.tax.status,
                        },
                        {
                          "btn-outline-primary": values.tax.status,
                        }
                      )}
                      onClick={() => {
                        setFieldValue("tax.status", false);
                      }}
                    >
                      No
                    </button>
                  </div>
                </div>
                <Input
                  id="tax.percentage"
                  label="Tax Percentage"
                  placeholder="Enter tax percentage"
                  disabled={values.tax.status === false}
                />
                <h6 className="title mt-5">Product Inventory</h6>
                <Input
                  id="inventory.SKU"
                  label="SKU"
                  placeholder="Enter stock keeping unit"
                />
                <Input
                  id="inventory.quantity"
                  label="Quantity"
                  placeholder="Enter stock quantity"
                />

                <h6 className="title mt-5">Attributes</h6>
                <div className="form-group">
                  <div>
                    <label>Attribute Name</label>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    value={attributeName}
                    onChange={(e) => setAttributeName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <div>
                    <label>Attribute Description</label>
                  </div>
                  <MDEditor
                    value={attributeValue}
                    onChange={(description) => setAttributeValue(description)}
                  />
                </div>

                <button
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={() => {
                    setFieldValue("attributes", [
                      ...values.attributes,
                      {
                        name: attributeName,
                        value: attributeValue,
                      },
                    ]);
                    setAttributeName("");
                    setAttributeValue("");
                  }}
                >
                  Add Attribute
                </button>
                {values.attributes.length > 0 && (
                  <table className="table table-striped table-bordered mt-5">
                    <thead className="thead-dark">
                      <tr>
                        <th>Name</th>
                        <th>Value</th>
                        <th>Controls</th>
                      </tr>
                    </thead>
                    <tbody>
                      {values.attributes.map((attribute, index) => (
                        <tr key={index}>
                          <td>{attribute.name}</td>
                          <td>
                            <MDEditor.Markdown source={attribute.value} />
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => {
                                const attributes = values.attributes;
                                attributes.splice(index, 1);
                                setFieldValue("attributes", [...attributes]);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                <h6 className="title mt-5">Shipping Information</h6>
                <Input
                  id="shipping.weight"
                  label="Shipping Weight"
                  placeholder="Enter shipping weight"
                  type="number"
                />
                <Input
                  id="shipping.length"
                  label="Shipping Length"
                  placeholder="Enter shipping length"
                  type="number"
                />
                <Input
                  id="shipping.breadth"
                  label="Shipping Breadth"
                  placeholder="Enter shipping breadth"
                  type="number"
                />
                <Input
                  id="shipping.height"
                  label="Shipping Height"
                  placeholder="Enter shipping height"
                  type="number"
                />
                <Input
                  id="shipping.price"
                  label="Shipping Price"
                  placeholder="Enter shipping price"
                  type="number"
                />
                <hr />
                <div className="form-group">
                  <button className="btn btn-primary" type="submit">
                    Save Product
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </Dashboard>
  );
}
