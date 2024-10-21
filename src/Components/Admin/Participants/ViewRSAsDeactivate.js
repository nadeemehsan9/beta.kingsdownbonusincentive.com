import { useFormik } from "formik";
import React, { useLayoutEffect, useState } from "react";
import { quizSearch } from "../../../schema";
import { Link } from "react-router-dom";
import AdminListService from "../../../services/admin-list.service";
import AdminFooter from "../includes/AdminFooter";
import HeaderSidebar from "../includes/HeaderSidebar";
import MoveTable from "../includes/MoveTable";
import ToTop from "../includes/ToTop";
import Pagination from "react-js-pagination";
import useTable from "../../../hooks/useTable";
import useSortableData from "../../../hooks/useSortableData";
import moment from "moment";
import Swal from "sweetalert2";
import $ from "jquery";
import { toast, ToastContainer } from "react-toastify";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

export default function ViewRSAsDeactivate() {
  const state = useSelector((state) => state.stateVals);
  const { id: adminId } = state;

  const TITLE = "Kings Down | RSA";
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState("10");
  const [resultData, setResultData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { height, width } = useWindowDimensions();
  const [totalResults, setTotalResults] = useState("0");
  const [totalPages, setTotalPages] = useState("1");
  const [selectedCol, setSelectedCol] = useState("");
  const [selectedVal, setSelectedVal] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [storeNameData, setStoreNameData] = useState([]);
  const date = new Date();
  var time = date.getTime();

  var singleSelections = "";
  var allSelections = "";

  const resetOptions = (e) => {
    $("#store_name").prop("selectedIndex", 0);
    $('input[name="fieldtype"]').prop("selectedIndex", 0);
  };

  //select export
  const changeSelection = () => {
    $(".slect_all").prop("checked", false);

    let selectedRecords = $(".table-style-1 tbody tr td input:checkbox:checked")
      .map(function () {
        return this.value;
      })
      .get()
      .join("+");
    singleSelections = selectedRecords;
    $(".export-selection").attr(
      "href",
      `https://claims-api.elitestacks.com/v1/export-selected-deactive-rsa/${selectedRecords}?time=${time}`
    );
    // FIXME length void click issue
    console.log(singleSelections.length);
  };

  const allSelect = async () => {
    $("input:checkbox").prop("checked", $(".slect_all").prop("checked"));
    var checkedVals = $(".select_one:checkbox:checked")
      .map(function () {
        return this.value;
      })
      .get();

    allSelections = checkedVals.join("+");
    console.log(allSelections);
    $(".export-selection").attr(
      "href",
      `https://claims-api.elitestacks.com/v1/export-selected-deactive-rsa/${allSelections}?time=${time}`
    );
  };

  const changeColumn = (e) => {
    setSelectedCol(e.target.value);
  };

  const changeValue = (e) => {
    setSelectedVal(e.target.value);
  };

  const changeStore = (e) => {
    setSelectedStore(e.target.value);
  };

  const getStoreNameData = async () => {
    setLoading(true);

    try {
      const { data } = await AdminListService.getStoreNameSelectOptions();

      const { response: res } = data;
      const results = [];

      res.map((value) => {
        results.push({
          key: value.name,
          value: value.name,
        });
      });

      setStoreNameData([
        { key: "Select Retailer Name", value: "" },
        ...results,
      ]);

      setLoading(false);
    } catch (err) {
      if (err?.response?.status === 404) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  const deleteSelected = async () => {
    var counter = singleSelections.length;
    console.log(counter);
    if (counter > 0) {
      setLoading(true);
      try {
        await AdminListService.deleteSelectedParticipants(
          singleSelections,
          adminId
        );
        setLoading(false);
        toast.success("Record(s) has been deleted!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } catch (err) {
        setLoading(false);
      }
    } else {
      console.log("else");
      toast.error("Please select some record!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    getResultData();
  };

  const getResultData = async (e) => {
    setLoading(true);

    try {
      if (values.fieldtype === "" && values.searchval === "") {
        const response = await AdminListService.getSearchRsaListDeactivated(
          "",
          "",
          e,
          limit,
          1
        );
        let resultData;
        if (response.status === 206) {
          resultData = response.data.response;
          setResultData(resultData);
          setTotalResults(response.data.records);
          setTotalPages(response.data.total_pages);
          setLimit(response.data.per_page);
          setLoading(false);
        }
      } else if (values.fieldtype === "" || values.searchval === "") {
        setLoading(false);

        handleSubmit();
      } else {
        const response = await AdminListService.getSearchDeactivatedRsaByDate(
          values.fieldtype,
          values.searchval,
          limit,
          1
        );
        let resultData;
        if (response.status === 206) {
          resultData = response.data.response;
          setResultData(resultData);
          setTotalResults(response.data.records);
          setTotalPages(response.data.total_pages);
          setLimit(response.data.per_page);
          setLoading(false);
        }
      }
    } catch (err) {
      setResultData([]);
      setTotalResults("0");
      setTotalPages("1");
      if (err?.response?.status === 404) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  const changeLimit = (e) => {
    let newLimit = e;
    const getResultData = async () => {
      try {
        if (
          (values.fieldtype === "" &&
            values.searchval === "" &&
            selectedStore === "") ||
          (values.fieldtype !== "" &&
            values.searchval === "" &&
            selectedStore === "")
        ) {
          setLoading(true);

          setLimit(newLimit);

          const response = await AdminListService.getSearchRsaListDeactivated(
            "",
            "",
            "",
            newLimit,
            1
          );

          let resultData;
          if (response.status === 206) {
            setLoading(false);
            resultData = response.data.response;
            setResultData(resultData);
            setTotalResults(response.data.records);
            setCurrentPage(1);
            setTotalPages(response.data.total_pages);
            setLimit(response.data.per_page);
          } else {
            setTotalResults("0");
            setTotalPages("1");
            setResultData([]);
            setLoading(false);
          }
        } else if (
          values.fieldtype !== "" &&
          values.searchval !== "" &&
          selectedStore !== ""
        ) {
          setLoading(true);

          setLimit(newLimit);

          const response = await AdminListService.getSearchRsaListDeactivated(
            values.fieldtype,
            values.searchval,
            selectedStore,
            newLimit,
            1
          );

          let resultData;
          if (response.status === 206) {
            setLoading(false);
            resultData = response.data.response;

            setResultData(resultData);
            setTotalResults(response.data.records);
            setTotalPages(response.data.total_pages);
            setLimit(response.data.per_page);
          } else {
            setTotalResults("0");
            setTotalPages("1");
            setResultData([]);
            setLoading(false);
          }
        } else if (selectedStore !== "") {
          setLoading(true);

          setLimit(newLimit);

          const response = await AdminListService.getSearchRsaListDeactivated(
            "",
            "",
            selectedStore,
            newLimit,
            1
          );

          let resultData;
          if (response.status === 206) {
            setLoading(false);
            resultData = response.data.response;

            setResultData(resultData);
            setTotalResults(response.data.records);
            setTotalPages(response.data.total_pages);
            setLimit(response.data.per_page);
          } else {
            setTotalResults("0");
            setTotalPages("1");
            setResultData([]);
            setLoading(false);
          }
        }
        //  else if (
        //   values.fieldtype !== "" ||
        //   values.searchval !== "" ||
        //   selectedStore !== ""
        // ) {
        //   // console.log("calling");
        //   handleSubmit();
        // }
      } catch (err) {
        if (err?.response?.status === 404) {
          setTotalResults("0");
          setTotalPages("1");
          setResultData([]);
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    };
    getResultData();
  };

  const changePagination = (e) => {
    setCurrentPage(e);

    // console.log(e)
    let pageNo = e;
    // setLimit(newLimit);
    console.log(limit);
    const getResultData = async () => {
      setLoading(true);

      try {
        const response = await AdminListService.getSearchRsaListDeactivated(
          values.fieldtype,
          values.searchval,
          selectedStore,
          limit,
          pageNo
        );
        // console.log("selected store=" + selectedStore);

        let resultData;
        if (response.status === 206) {
          resultData = response.data.response;

          setResultData(resultData);
          setLimit(response.data.per_page);
          setLoading(false);
        }
      } catch (err) {
        if (err?.response?.status === 404) {
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    };
    getResultData();
  };

  const searchData = async (action) => {
    setLoading(true);
    try {
      const response = await AdminListService.getSearchRsaListDeactivated(
        values.fieldtype,
        values.searchval,
        selectedStore,
        limit,
        1
      );
      let resultData;
      if (response.status === 206) {
        setLoading(false);
        resultData = response.data.response;
        setResultData(resultData);
        setTotalResults(response.data.records);
        setTotalPages(response.data.total_pages);
        setLimit(response.data.per_page);
      } else {
        setTotalResults("0");
        setTotalPages("1");
        setResultData([]);
        setLoading(false);
      }
    } catch (err) {
      setTotalPages("1");
      setTotalResults("0");
      if (err?.response?.status === 500) {
        setLoading(false);
      } else {
        setLoading(false);
        setResultData([]);
      }
    }
  };

  const delData = async (delId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#70b0c1",
      cancelButtonColor: "#e60000",
      confirmButtonText: "Yes",
      cancelButtonText: "Close",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);

        try {
          const response = await AdminListService.deleteParticipantsData(
            delId,
            adminId
          );
          if (response.status === 200) {
            setLoading(false);
            toast.success("Deleted Successfully!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            getResultData();
          }
        } catch (err) {
          toast.error("Something went wrong!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setLoading(false);
        }
      }
    });
  };
  const activateRsa = async (delId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to activate this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#70b0c1",
      cancelButtonColor: "#e60000",
      confirmButtonText: "Yes",
      cancelButtonText: "Close",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);

        try {
          await AdminListService.activeParticipantsData(adminId, delId);
          setLoading(false);
          toast.success("Activated Successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          resetOptions();
          getResultData();
        } catch (err) {
          toast.error("Something went wrong!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setLoading(false);
        }
      }
    });
  };

  const searchMethod = async () => {
    setLoading(true);

    var st_name = $("#store_name").val();

    try {
      const response = await AdminListService.getSearchRsaStoreListDeactivated(
        limit,
        st_name,
        selectedCol,
        selectedVal,
        1
      );

      let resultData;
      if (response.status === 206) {
        resultData = response.data.response;

        setResultData(resultData);
        setLimit(response.data.per_page);
        setTotalResults(response.data.records);
        setTotalPages(response.data.total_pages);
        setCurrentPage(1);
        setLoading(false);
      }
    } catch (err) {
      setTotalPages("1");
      setResultData([]);
      setTotalResults(0);

      if (err?.response?.status === 404) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  };
  useLayoutEffect(() => {
    const getResultData = async () => {
      setLoading(true);
      try {
        const response = await AdminListService.getRsaListDeactivated();
        let resultData;
        if (response.status === 206) {
          resultData = response.data.response;
          setResultData(resultData);
          setLimit(response.data.per_page);
          setTotalResults(response.data.records);
          setTotalPages(response.data.total_pages);
          setLoading(false);
        }
      } catch (err) {
        setTotalPages("1");
        if (err?.response?.status === 404) {
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    };
    getResultData();
    getStoreNameData();
  }, []);

  const Table = ({ data, rowsPerPage }) => {
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);
    const { items, requestSort, sortConfig } = useSortableData(slice);

    const getClassNamesFor = (name) => {
      if (!sortConfig) {
        return;
      }
      return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    return (
      <>
        <table className=" caption-top align-middle table-borderless table-style-1">
          <thead>
            <tr>
              <th
                scope="col"
                onClick={() => requestSort("Select")}
                className={getClassNamesFor("Select")}
              >
                <label htmlFor="Select">
                  Select{" "}
                  <input
                    id="Select"
                    className="form-check-input slect_all"
                    type="checkbox"
                    onChange={allSelect}
                  />
                </label>
              </th>
              <th
                scope="col"
                onClick={() => requestSort("id")}
                className={getClassNamesFor("id")}
              >
                No
              </th>
              <th
                scope="col"
                onClick={() => requestSort("emp_number")}
                className={getClassNamesFor("emp_number")}
              >
                Employee No
              </th>
              <th
                scope="col"
                onClick={() => requestSort("first_name")}
                className={getClassNamesFor("first_name")}
              >
                Login Info
              </th>
              <th
                scope="col"
                onClick={() => requestSort("address")}
                className={getClassNamesFor("address")}
              >
                Address
              </th>
              <th
                scope="col"
                onClick={() => requestSort("store_name")}
                className={getClassNamesFor("store_name")}
              >
                Retailer Information
              </th>
              <th
                scope="col"
                onClick={() => requestSort("created_at")}
                className={getClassNamesFor("created_at")}
              >
                Date Registered
              </th>

              <th
                scope="col"
                onClick={() => requestSort("Action")}
                className={getClassNamesFor("Action")}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {items.length ? (
              items.map((el, index) => (
                <tr key={el.id}>
                  <td>
                    <input
                      className="form-check-input select_one"
                      id={el.id}
                      value={el.id}
                      type="checkbox"
                      onChange={changeSelection}
                    />
                  </td>
                  <td>
                    {currentPage === 1
                      ? index + 1
                      : (currentPage - 1) * limit + index + 1}
                  </td>
                  <td>
                    {el.emp_number > "" ? el.emp_number.toUpperCase() : "N/A"}
                  </td>

                  <td>
                    <ul className="rob-rollmann">
                      <li>
                        <b>First Name:</b> {el.first_name}
                      </li>
                      <li>
                        <b>Last Name:</b> {el.last_name}
                      </li>
                      <li>
                        <b>Username:</b> {el.username}
                      </li>
                      <li>
                        <b>Password:</b> {el.password}
                      </li>
                      <li>
                        <b>Email:</b> {el.email}
                      </li>
                      <li>
                        <b>Phone:</b> {el.phone}
                      </li>
                    </ul>
                  </td>

                  <td>
                    <ul className="rob-rollmann">
                      <li>
                        <b>Address:</b> {el.address1}
                      </li>
                      <li>
                        <b>State:</b>{" "}
                        {el.state ? el.state.toUpperCase() : "N/A"}
                      </li>
                      <li>
                        <b>City:</b> {el.city ? el.city.toUpperCase() : "N/A"}
                      </li>
                      <li>
                        <b>Zip:</b> {el.zip}
                      </li>
                    </ul>
                  </td>

                  <td>
                    <ul className="rob-rollmann">
                      <li>
                        <b>Retailer:</b> {el.retailer_name}
                      </li>
                    </ul>
                  </td>
                  <td>{moment(el.created_at).format("MM-DD-YYYY")}</td>

                  <td className="add-edit-delete-inline">
                    <button
                      className="btn btn-primary px-2 back-blue btn-sm mb-2 "
                      onClick={() => activateRsa(el.id)}
                    >
                      Activate <i className="bi bi-person-check-fill"></i>
                    </button>
                    <Link
                      to={"/admin/edit/rsa/" + el.id}
                      className="btn btn-primary px-2 back-blue btn-sm mb-2 "
                    >
                      Edit <i className="bi bi-pencil-fill"></i>{" "}
                    </Link>
                    {/* <button className="btn btn-primary px-4 back-blue">
                      Edit <i className="bi bi-pencil-fill"></i>{" "}
                    </button> */}
                    <button
                      className="btn btn-primary px-2 back-blue btn-sm mb-2 "
                      onClick={() => delData(el.id)}
                    >
                      Delete <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-capitalize">
                  No record found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </>
    );
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        fieldtype: "",
        searchval: "",
      },
      validationSchema: quizSearch,
      onSubmit: (values, action) => {
        searchData(action);
      },
    });

  setTimeout(() => {
    setLoading(false);
  }, 1000);
  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <div className="semi-dark">
        <div className="wrapper">
          <ToastContainer />
          <HeaderSidebar />
          <main className="page-content">
            <div className="row">
              <div className="col">
                <div className="manage-heading-2">
                  <h2>
                    View Deactivated RSA <span>[{totalResults}]</span>
                  </h2>
                </div>

                <div className="slides-here">
                  <div className="alert alert-info">
                    <b>Info!</b> You can search your required data by putting
                    text in search box
                  </div>
                  <div className="main-content-box">
                    <div className="manage-territories-box">
                      <form onSubmit={handleSubmit} noValidate>
                        <div className="row">
                          <div className="col-lg-12">
                            <h2 className="manage-territories-heading">
                              All Deactivated RSA's
                            </h2>
                          </div>

                          <div className="col-lg-3 mt-4">
                            <div
                              className={`form-group custom-group ${
                                storeNameData.length ? "" : "placeholder-glow"
                              }`}
                            >
                              <select
                                className={`form-select ${
                                  storeNameData.length ? "" : "placeholder"
                                }`}
                                id="store_name"
                                onChange={(e) => {
                                  searchMethod(e);
                                  changeStore(e);
                                }}
                              >
                                {storeNameData.map((res) => {
                                  return (
                                    <option key={res.value} value={res.value}>
                                      {res.key}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="form-group custom-group mt-4">
                              <select
                                className={`form-select ${
                                  errors.fieldtype && touched.fieldtype
                                    ? "is-danger"
                                    : ""
                                }`}
                                onChange={(e) => {
                                  handleChange(e);
                                  changeColumn(e);
                                }}
                                onBlur={handleBlur}
                                name="fieldtype"
                                value={values.fieldtype || ""}
                                required
                              >
                                <option value="">Search By</option>
                                <option value="1">Employee No</option>
                                <option value="2">First Name</option>
                                <option value="3">Last Name</option>
                                <option value="4">Username</option>
                                <option value="5">Email</option>
                                <option value="6">Address</option>
                                <option value="7">State</option>
                                <option value="8">City</option>
                                <option value="9">Zip</option>
                              </select>
                              {errors.fieldtype && touched.fieldtype ? (
                                <p className="help is-danger">
                                  {errors.fieldtype}
                                </p>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div className="input-group custom-group mt-4 mb-0">
                              <input
                                type="text"
                                className={`form-control ${
                                  errors.searchval && touched.searchval
                                    ? "is-danger"
                                    : ""
                                }`}
                                onChange={(e) => {
                                  handleChange(e);
                                  changeValue(e);
                                }}
                                onBlur={handleBlur}
                                name="searchval"
                                placeholder="Enter something to search"
                                value={values.searchval || ""}
                                required
                              />{" "}
                              <button
                                className="input-group-text back-orange"
                                id="basic-addon2"
                              >
                                Search
                              </button>
                            </div>
                            {errors.searchval && touched.searchval ? (
                              <p className="help is-danger">
                                {errors.searchval}
                              </p>
                            ) : null}
                          </div>
                          <div className="col-lg-2">
                            <div className="form-group custom-group">
                              <label className="form-label"></label>
                              <select
                                className="form-select"
                                value={limit}
                                onChange={(e) => changeLimit(e.target.value)}
                              >
                                <option>10</option>
                                <option>50</option>
                                <option>100</option>
                                <option>200</option>
                                <option>300</option>
                                <option>400</option>
                                <option>500</option>
                                <option>600</option>
                                <option>700</option>
                                <option>800</option>
                                <option>900</option>
                                <option>1000</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-lg-1">
                            <li className="dropdown">
                              <button
                                className="btn btn-primary back-blue dropdown-toggle viewRSA"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                id="RsaAction"
                              >
                                Action
                              </button>
                              <ul className="dropdown-menu">
                                <li>
                                  <a
                                    className="dropdown-item delete-selection"
                                    name="delete_selected"
                                    href="javascript:void(0)"
                                    onClick={(e) => {
                                      deleteSelected(e);
                                    }}
                                    style={{ cursor: "pointer" }}
                                  >
                                    Delete Selected
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="dropdown-item export-selection"
                                    name="export_selected"
                                    href="javascript:void(0)"
                                    style={{ cursor: "pointer" }}
                                  >
                                    Export Selected
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={`${process.env.REACT_APP_API_Link}export-deactive-rsa?time=${time}`}
                                    className="dropdown-item"
                                    style={{ cursor: "pointer" }}
                                  >
                                    Export All
                                  </a>
                                </li>
                              </ul>
                            </li>
                          </div>
                          <div className="col-lg-1">
                            <button
                              className="btn btn-primary back-orange viewRSA1 ms-0"
                              type="reset"
                              onClick={() => window.location.reload(false)}
                            >
                              Reset
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    {/* <MoveTable /> */}
                    <div className="claim-table">
                      <Table data={resultData} rowsPerPage={limit} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="row">
                <div className="pagi">
                  {totalResults > limit && totalPages > 1 ? (
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={parseInt(limit)}
                      totalItemsCount={totalResults}
                      onChange={(e) => {
                        changePagination(e);
                      }}
                      pageRangeDisplayed={
                        width >= 1024
                          ? 8
                          : width >= 768
                          ? 6
                          : width >= 425
                          ? 3
                          : width >= 375
                          ? 2
                          : 1
                      }
                      itemClass="page-item"
                      linkClass="page-link"
                      firstPageText="First Page"
                      lastPageText="Last Page"
                    />
                  ) : (
                    ""
                  )}
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
      </div>
    </>
  );
}
