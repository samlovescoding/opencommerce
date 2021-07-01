import Dashboard from "../../layouts/dashboard";
import DataTable from "../../components/datatable";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../services/api";
import sweetError from "../../services/sweetError";
import swal from "sweetalert";
import useUrlState from "@ahooksjs/use-url-state";

export default function AdminSeller() {
  const [sellers, setSellers] = useState([]);
  const [query, setQuery] = useUrlState({
    query: "",
    page: 0,
    limit: 10,
  });
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    loadAccounts();
  }, []);

  useEffect(() => {
    loadAccounts();
  }, [query]);

  async function loadAccounts() {
    try {
      const response = await api.get("/seller", { params: query });
      setSellers(response.sellers);
      setTotalCount(response.totalCount);
    } catch (e) {
      sweetError(e);
    }
  }

  async function onClickUpdateStatus(status, seller) {
    try {
      await api.patch(`/seller/${seller._id}/status`, { status });
      swal({
        title: "Success",
        text: "Account updated successfully",
        icon: "success",
      });
      loadAccounts();
    } catch (e) {
      sweetError(e);
    }
  }

  async function onClickDeleteAccount(seller) {
    try {
      await api.delete(`/seller/${seller._id}`);
      swal({
        title: "Success",
        text: "Account deleted successfully",
        icon: "success",
      });
      loadAccounts();
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
              <h4 className="title">Seller Accounts</h4>
            </div>
          </div>
          <DataTable
            rows={sellers}
            limit={query.limit}
            query={query.query}
            columns={["name", "email", "status", "controls"]}
            totalCount={totalCount}
            page={query.page}
            onChangePage={(page) => {
              setQuery({ ...query, page });
            }}
            onChangeQuery={(qs) => {
              setQuery({ ...query, query: qs });
            }}
            scoped={{
              controls: (seller) => {
                return (
                  <div className="d-flex">
                    <button
                      className="btn btn-success btn-sm mr-1"
                      onClick={() => {
                        onClickUpdateStatus("Approved", seller);
                      }}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-warning btn-sm mr-1"
                      onClick={() => {
                        onClickUpdateStatus("Rejected", seller);
                      }}
                    >
                      Reject
                    </button>
                    <button
                      className="btn btn-danger btn-sm mr-1"
                      onClick={() => {
                        onClickDeleteAccount(seller);
                      }}
                    >
                      Delete Account
                    </button>
                  </div>
                );
              },
            }}
          />
        </div>
      </div>
    </Dashboard>
  );
}
