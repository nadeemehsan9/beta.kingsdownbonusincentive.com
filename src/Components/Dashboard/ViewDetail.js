import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminFooter from "../Admin/includes/AdminFooter";
import HeaderSidebar from "../Admin/includes/HeaderSidebar";
import ToTop from "../Admin/includes/ToTop";
import UserService from "../../services/user.service";
import { ToastContainer } from "react-toastify";

import SeeAttachment from "../Admin/includes/SeeAttachment";
import Swal from "sweetalert2";

import { useSelector } from "react-redux";
import moment from "moment";

export default function ViewDetail() {
  const states = useSelector((states) => states.stateVals);
  const { id: userId } = states;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [reason, setReason] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [ship_quantity, setShipQuantity] = useState("");
  const [split_sale_status, setSplitSaleStatus] = useState("");
  const [reward, setReward] = useState("");
  const [deliver_invoice, setDeliverInvoice] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [role, setRole] = useState("");
  const [file, setFile] = useState("");
  const [attachment, setAttachment] = useState("");

  const [storeName, setStoreName] = useState("");

  const [emp_number, setEmpNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fax, setFax] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [checkStatus, setCheckStatus] = useState("");

  const checkClaimStatus = async () => {
    setLoading(true);
    try {
      const { data } = await UserService.checkClaimStatus(id);
      const status = data.response.sale_status;
      setCheckStatus(status);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkClaimStatus();
  }, [id]);

  useEffect(() => {
    const getClaimDetail = async () => {
      try {
        setLoading(true);

        const { data } = await UserService.getClaimDetail(id);
        const { response: res } = data;
        console.log(res);
        let rewardAmount =
          res[0].split_sale_status == "complete "
            ? res[0].ship_quantity * res[0].price
            : res[0].ship_quantity * (res[0].price / 2);
        setName(res[0].name);
        setNumber(res[0].number);
        setSize(res[0].code + "/" + res[0].size);
        setPrice(res[0].price);
        setShipQuantity(res[0].ship_quantity);
        setSplitSaleStatus(res[0].split_sale_status);
        setReward(rewardAmount);
        setDeliverInvoice(res[0].deliver_invoice);
        setInvoiceDate(res[0].invoice_date);
        setRole(res[0].role);
        setFile(res[0].file);

        setStoreName(res[0].retailer_name);

        setEmpNumber(res[0].emp_number);
        setFullName(res[0].first_name + " " + res[0].last_name);
        setUsername(res[0].username);
        setEmail(res[0].email);
        setPhone(res[0].phone);
        setFax(res[0].fax);
        setAddress1(res[0].address1);
        setAddress2(res[0].address2);

        setLoading(false);
      } catch (e) {
        setLoading(false);
        // navigate("/dashboard");
      }
    };

    getClaimDetail();
  }, []);

  const AcceptClaim = async (id) => {
    try {
      setLoading(true);
      let object = {
        admin: userId,
        updated_by: userId,
        // updated_ip: secureLocalStorage.getItem("ip"),
      };
      await UserService.acceptClaimById(object, id);
      //TODO starter function

      // getAllClaimsData();
      //TODO end
      checkClaimStatus(id);
      setLoading(false);
      Swal.fire({
        title: "Success",
        text: "Your claim has been approved successfully",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#28a745",
      });
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: "Error",
        text: "Error in accepting claim",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#28a745",
      });
    }
  };
  const RejectClaim = async (id, reason) => {
    try {
      setLoading(true);
      let object = {
        admin: userId,
        updated_by: userId,
        // updated_ip: secureLocalStorage.getItem("ip"),
        reason: reason.reason,
      };
      await UserService.rejectClaimById(object, id);

      checkClaimStatus(id);
      setLoading(false);
      Swal.fire({
        title: "Success",
        text: "Your claim has been rejected successfully",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#28a745",
      });
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: "Error",
        text: "Error in rejecting claim",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#28a745",
      });
    }
  };
  // single approval
  const alertAprove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are approving this claim!",
      confirmButtonText: "Approve",
      icon: "warning",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#28a745",
      showCancelButton: true,
      focusConfirm: false,
    }).then((result) => {
      if (result.isConfirmed) {
        AcceptClaim(id);
      }
    });
  };
  const alertReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are rejecting this claim!",
      icon: "warning",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#DD6B55",
      showCancelButton: true,
      focusConfirm: false,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "warning",
          title: "Reason?",
          html: `Reason to reject this claim!<input type="text" id="reason" class="swal2-input" placeholder="Reason">`,
          confirmButtonText: "Reject",
          confirmButtonColor: "#DD6B55",
          focusConfirm: false,
          preConfirm: () => {
            const reason = Swal.getPopup().querySelector("#reason").value;
            if (!reason) {
              Swal.showValidationMessage(`Please enter reason`);
            }
            return { reason: reason };
          },
        }).then((result) => {
          setReason(result.value);
          if (result.isConfirmed) {
            RejectClaim(id, result.value);
          }
        });
      }
    });
  };

  return (
    <div className="semi-dark">
      <div className="wrapper">
        <ToastContainer />

        <HeaderSidebar />
        <main className="page-content">
          <div className="row">
            <div className="col">
              <div className="manage-heading-2">
                <h2>Detail Claim</h2>
              </div>

              <div className="detail-form">
                <div className="main-content-box">
                  {/* ******** Claim Info Start ******** */}
                  <div className="claim-outer">
                    <div className="manage-territories-box">
                      <h2 className="manage-territories-heading">
                        CLAIM INFORMATION
                      </h2>

                      {checkStatus == "pending" ? (
                        <div className="col-12">
                          <div
                            className="actionButton"
                            style={{ textAlign: "right" }}
                          >
                            <button
                              type="button"
                              className="btn btn-success aprClaim"
                              onClick={() => alertAprove(id)}
                            >
                              Approve
                            </button>{" "}
                            <button
                              href=""
                              type="button"
                              className="btn btn-danger rejClaim"
                              onClick={() => alertReject(id)}
                            >
                              Reject
                            </button>{" "}
                          </div>
                        </div>
                      ) : (
                        <div className="col-12">
                          <div
                            className="actionButton"
                            style={{ textAlign: "right" }}
                          >
                            <span
                              className={
                                checkStatus == "approved"
                                  ? "success"
                                  : checkStatus == "rejected"
                                  ? "danger"
                                  : "pending"
                              }
                            >
                              <i
                                className={`${
                                  checkStatus == "approved"
                                    ? "fa fa-thumbs-up"
                                    : checkStatus == "rejected"
                                    ? "fa fa-thumbs-down"
                                    : "fa fa-clock-o"
                                }`}
                              ></i>{" "}
                              {checkStatus.charAt(0).toUpperCase() +
                                checkStatus.slice(1)}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="row">
                        <div className="col-lg-4">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Product Name"
                              name="name"
                              value={name || ""}
                              disabled
                            />
                            <label>Product Name</label>
                          </div>
                        </div>

                        <div className="col-lg-4">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="UPC/Size/Spiff"
                              name="size"
                              value={`${size}/$${price}`}
                              disabled
                            />
                            <label>UPC/Size/Spiff</label>
                          </div>
                        </div>

                        <div className="col-lg-4">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Quantity"
                              name="ship_quantity"
                              value={ship_quantity || ""}
                              disabled
                            />
                            <label>Quantity</label>
                          </div>
                        </div>

                        <div className="col-lg-4">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Reward Amount"
                              name="reward"
                              value={`$ ${
                                split_sale_status == "complete"
                                  ? ship_quantity * price
                                  : ship_quantity * (price / 2)
                              }`}
                              disabled
                            />
                            <label>Reward Amount</label>
                          </div>
                        </div>

                        <div className="col-lg-4">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Invoice No"
                              name="deliver_invoice"
                              value={deliver_invoice || ""}
                              disabled
                            />
                            <label>Invoice No.</label>
                          </div>
                        </div>

                        <div className="col-lg-4">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Invoice Date"
                              name="invoiceDate"
                              value={
                                invoiceDate == "0000-00-00"
                                  ? "N/A"
                                  : moment(invoiceDate).format("MM-DD-YYYY")
                              }
                              disabled
                            />
                            <label>Invoice Date</label>
                          </div>
                        </div>

                        <div className="col-lg-4">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="User Role"
                              name="role"
                              value={role.toUpperCase()}
                              disabled
                            />
                            <label>User Role</label>
                          </div>
                        </div>

                        <div className="col-lg-8">
                          <div className="box-attachment">
                            <label
                              className="text-center"
                              style={{
                                marginLeft: "8px",
                                color: "#808080b0",
                                fontSize: "13px",
                              }}
                            >
                              Attachment
                            </label>
                            <br />
                            <Link
                              to="/"
                              className="orng-textbtn"
                              loading="lazy"
                              onClick={() => {
                                setAttachment(
                                  process.env.REACT_APP_IMAGE_Link + file
                                );
                              }}
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop"
                              type="button"
                            >
                              See Attachment
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />

                  {/* ******** User Info Start ******** */}
                  <div className="claim-outer">
                    <div className="manage-territories-box">
                      <h2 className="manage-territories-heading">
                        RETAILER INFORMATION
                      </h2>
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Store Name"
                              name="storeName"
                              value={storeName || ""}
                              disabled
                            />
                            <label>Retailer Name</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  {/* ******** Store Info Start ******** */}
                  <div className="claim-outer">
                    <div className="manage-territories-box">
                      <h2 className="manage-territories-heading">
                        USER INFORMATION
                      </h2>
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Employee No"
                              name="emp_number"
                              value={emp_number || ""}
                              disabled
                            />
                            <label>Employee No.</label>
                          </div>
                        </div>

                        <div className="col-lg-4">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Full Name"
                              name="fullName"
                              value={fullName || ""}
                              disabled
                            />
                            <label>Full Name</label>
                          </div>
                        </div>

                        <div className="col-lg-4">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="User Name"
                              name="username"
                              value={username || ""}
                              disabled
                            />
                            <label>User Name</label>
                          </div>
                        </div>

                        <div className="col-lg-4">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Email"
                              name="email"
                              value={email || ""}
                              disabled
                            />
                            <label>Email</label>
                          </div>
                        </div>

                        <div className="col-lg-4">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Phone No"
                              name="phone"
                              value={phone || ""}
                              disabled
                            />
                            <label>Phone No</label>
                          </div>
                        </div>

                        <div className="col-lg-4">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Fax No"
                              name="fax"
                              value={fax == "" ? "N/A" : fax}
                              disabled
                            />
                            <label>Fax No.</label>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Address 1"
                              name="address1"
                              value={address1 || ""}
                              disabled
                            />
                            <label>Address 1</label>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Address 2"
                              name="address2"
                              value={address2 == "" ? "N/A" : address2}
                              disabled
                            />
                            <label>Address 2</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <ToTop />
        <div className={`loader ${loading ? "in" : ""}`}>
          <div className="spinner-border main-spin"></div>
        </div>
      </div>
      <AdminFooter />
      <SeeAttachment src={attachment} />
    </div>
  );
}
