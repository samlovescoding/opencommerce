import Dashboard from "../../layouts/dashboard";
import api from "../../services/api";
import useUrlState from "@ahooksjs/use-url-state";
import { useEffect, useState } from "react";
import sweetError from "../../services/sweetError";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

export default function AdminProducts() {
  const [loading, setLoading] = useState(true);
  const [queryParams, setQueryParams] = useUrlState({
    query: "",
    limit: 10,
    page: 1,
  });
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [queryParams]);

  async function loadProducts() {
    try {
      setLoading(true);
      const { products, totalCount } = await api.get("/product/admin", {
        params: queryParams,
      });
      setProducts(products);
      setTotalPages(Math.ceil(totalCount / parseInt(queryParams.limit)));
      setLoading(false);
    } catch (e) {
      sweetError(e);
    }
  }

  async function onClickUpdateStatus(status, product) {
    try {
      await api.patch(`/product/${product._id}/status`, { status });
      swal({
        title: "Success",
        icon: "success",
        text: "Product status was updated.",
      });
      loadProducts();
    } catch (e) {
      sweetError(e);
    }
  }

  return (
    <Dashboard>
      <div className="card card-bordered">
        <div className="card-inner">
          <div className="card-title-group align-start mb-5">
            <div className="card-title">
              <h4 className="title">Your Products</h4>
            </div>
          </div>

          {!loading && (
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>SKU</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Controls</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.inventory.SKU}</td>
                    <td>{product.name}</td>
                    <td>
                      <img alt="" src={api.image(product.image)} height="100" />
                    </td>
                    <td>{product.price.sale}</td>
                    <td>{product.inventory.quantity}</td>
                    <td>{product.status}</td>
                    <td>
                      <div className="d-flex">
                        <button
                          className="btn btn-sm btn-warning mr-2"
                          onClick={() =>
                            onClickUpdateStatus("Approved", product)
                          }
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() =>
                            onClickUpdateStatus("Rejected", product)
                          }
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {loading && (
            <div className="d-flex justify-center align-items-center">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          )}
          <div className="d-flex mt-3 ">
            <div className="d-flex align-items-center">
              <div style={{ width: 300 }}>Products Per Page</div>
              <select
                name="limit"
                id="limit"
                className="form-control"
                value={queryParams.limit}
                onChange={(e) =>
                  setQueryParams({
                    ...queryParams,
                    limit: e.target.value,
                    page: 1,
                  })
                }
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
            <div className="ml-auto">
              <button
                className="btn btn-primary mr-2"
                onClick={() => {
                  if (parseInt(queryParams.page) > 1)
                    setQueryParams({
                      ...queryParams,
                      page: parseInt(queryParams.page) - 1,
                    });
                }}
                disabled={parseInt(queryParams.page) <= 1}
              >
                Previous
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  if (parseInt(queryParams.page) < totalPages)
                    setQueryParams({
                      ...queryParams,
                      page: parseInt(queryParams.page) + 1,
                    });
                }}
                disabled={parseInt(queryParams.page) >= totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}
