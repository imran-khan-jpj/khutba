import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../App";

const AllKhateeb = () => {
  const { allKhateebs, getAllKhateeb, isLoggedIn, user, apiDomain } =
    useContext(AppContext);
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const history = useHistory();

  useEffect(() => {
    const hideMsg = setTimeout(() => {
      if (success) {
        getAllKhateeb();
      }
      setSuccess(false);
      setErr(false);
    }, 3000);

    return () => clearTimeout(hideMsg);
  }, [err, success]);

  if (!isLoggedIn) {
    history.push("/");
  }
  if (user.role !== "admin") {
    history.push("/author/admin/login");
  }

  const deleteKhateeb = (id) => {
    axios
      .delete(`${apiDomain}/admin/delete/${id}/khateeb`)
      .then((res) => {
        if (res.status === 200) {
          setSuccess(true);
          setSuccessMsg("Khateeb Deleted Successfully!");
          getAllKhateeb();
        } else {
          setErr(true);
          setErrMsg(res.data.err);
        }
      })
      .catch((err) => {
        setErr(true);
        setErrMsg(err.data.err);
      });
  };
  return (
    <div className="row">
      <div className="col-12">
        <div className="text-center">List of All Khateebs</div>
        {success && (
          <div className="alert alert-success text-center">{successMsg}</div>
        )}
        {err && <div className="alert alert danger text-center">{errMsg}</div>}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sr #</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allKhateebs.length > 0 ? (
              allKhateebs.map((khateeb, index) => {
                return (
                  <tr key={khateeb.id}>
                    <td>{index + 1}</td>
                    <td>{khateeb.name}</td>
                    <td>{khateeb.email}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteKhateeb(khateeb.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4}>
                  <p className="alert alert-danger text-center">
                    No Khateeb Found
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllKhateeb;
