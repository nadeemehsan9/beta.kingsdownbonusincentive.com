import React, { useLayoutEffect, useRef, useState, useEffect } from "react";

import AdminFooter from "../includes/AdminFooter";
import HeaderSidebar from "../includes/HeaderSidebar";
import ToTop from "../includes/ToTop";
import "react-datepicker/dist/react-datepicker.css";

import SeeAttachment from "../includes/SeeAttachment";
import useTable from "../../../hooks/useTable";
import useSortableData from "../../../hooks/useSortableData";
import { useSelector } from "react-redux";
import UserService from "../../../services/user.service";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import Pagination from "react-js-pagination";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import $ from "jquery";
import { quizSearch } from "../../../schema";
import moment from "moment";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function AllClaims() {
  const TITLE = "Kings Down | All Claims";
  const API_URL = process.env.REACT_APP_API_Link;

  const state = useSelector((state) => state.stateVals);
  const { id, uType } = state;

  // const [loading, setLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");

  const [attachment, setAttachment] = useState("");

  const [limit, setLimit] = useState("10");
  const [resultData, setResultData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState("0");
  const [totalPages, setTotalPages] = useState("1");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [startInvDate, setStartInvDate] = useState("");
  const [endInvDate, setEndInvDate] = useState("");

  const [selectedCol, setSelectedCol] = useState("");
  const [insertedVal, setInsertedVal] = useState("");
  const [isEndDate, setIsEndDate] = useState(false);
  const [isRecords, setIsRecords] = useState(true);
  const [isExport, setIsExport] = useState(true);

  const [isEndInvDate, setIsEndInvDate] = useState(false);
  const [isInvRecords, setIsInvRecords] = useState(true);
  const [isInvExport, setIsInvExport] = useState(true);

  const date = new Date();
  var time = date.getTime();

  const styles = {
    range: {
      pointerEvents: isExport ? "none" : "",
      opacity: isExport ? "0.6" : "1",
    },
    invRange: {
      pointerEvents: isInvExport ? "none" : "",
      opacity: isInvExport ? "0.6" : "1",
    },
  };

  // FIXME select col empty not working
  const changeColumn = (e) => {
    if (e.target.value != "") {
      setSelectedCol(e.target.value);
    } else {
      setSelectedCol("");
    }
  };

  const changeValue = (e) => {
    if (e.target.value != "") {
      setInsertedVal(e.target.value);
    } else {
      setInsertedVal("");
    }
  };

  // TODO change dateRef to startDateRef
  const dateRef = useRef(null);
  const endDateRef = useRef(null);

  const dateInvRef = useRef(null);
  const endDateInvRef = useRef(null);

  const { height, width } = useWindowDimensions();
  var singleSelections = "";
  var allSelections = "";
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
      `https://beta.api.selectyourrebate.com/v1/export-selected-claims-kings/${selectedRecords}?time=${time}`
    );
    // FIXME length void click issue
  };

  const allSelect = async () => {
    $("input:checkbox").prop("checked", $(".slect_all").prop("checked"));
    var checkedVals = $(".select_one:checkbox:checked")
      .map(function () {
        return this.value;
      })
      .get();

    allSelections = checkedVals.join("+");

    $(".export-selection").attr(
      "href",
      `https://beta.api.selectyourrebate.com/v1/export-selected-claims-kings/${allSelections}?time=${time}`
    );
  };

  // selected approval
  const approveSelected = async () => {
    var selectedRecords = $(".table-style-1 tbody tr td input:checkbox:checked")
      .map(function () {
        return this.value;
      })
      .get()
      .join(",");

    if (!selectedRecords.length) {
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
    } else {
      // TODO approve claim
      Swal.fire({
        title: "Are you sure?",
        text: "You are approving this claim!",
        confirmButtonText: "Approve",
        icon: "question",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#28a745",
        showCancelButton: true,
        focusConfirm: false,
      }).then((result) => {
        if (result.isConfirmed) {
          AcceptClaim("selected", selectedRecords);
        }
      });
    }
  };

  // single approval
  const alertAprove = (saleId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are approving this claim!",
      confirmButtonText: "Approve",
      icon: "question",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#28a745",
      showCancelButton: true,
      focusConfirm: false,
    }).then((result) => {
      if (result.isConfirmed) {
        AcceptClaim("single", saleId);
      }
    });
  };

  const getAllClaimsData = async () => {
    setLoading(true);
    if (id) {
      try {
        // TODO user type service missing
        const response = await UserService.latestClaimsList();

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
        setResultData([]);
        setTotalResults("0");
        setLoading(false);
      }
    }
  };

  const AcceptClaim = async (type, saleId) => {
    try {
      setLoading(true);
      if (type == "single") {
        let object = {
          admin: id,
          updated_by: id,
          updated_ip: secureLocalStorage.getItem("ip"),
        };
        await UserService.acceptClaimById(object, saleId);
      } else if (type == "selected") {
        let object = {
          id: saleId,
          admin: id,
          updated_by: id,
          updated_ip: secureLocalStorage.getItem("ip"),
        };
        await UserService.acceptSelectedClaims(object);
      } else if (type == "all") {
        let object = {
          admin: id,
          updated_by: id,
          updated_ip: secureLocalStorage.getItem("ip"),
        };
        await UserService.acceptAllClaims(object);
      }

      //TODO starter function

      getAllClaimsData();
      //TODO end

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
        text: "Error in approving claim",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#28a745",
      });
    }
  };
  const acceptAll = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are approving all claims!",
      confirmButtonText: "Approve",
      icon: "question",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#28a745",
      showCancelButton: true,
      focusConfirm: false,
    }).then((result) => {
      if (result.isConfirmed) {
        AcceptClaim("all", "");
      }
    });
  };
  const rejectAll = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are rejecting all claims!",
      icon: "question",
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
            RejectClaim("all", "", result.value);
          }
        });
      }
    });
  };
  // selected rejection
  const rejectSelected = (saleId) => {
    var selectedRecords = $(".table-style-1 tbody tr td input:checkbox:checked")
      .map(function () {
        return this.value;
      })
      .get()
      .join(",");

    if (!selectedRecords.length) {
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
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You are rejecting this claim!",
        icon: "question",
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
              RejectClaim("selected", selectedRecords, result.value);
            }
          });
        }
      });
    }
  };

  // single rejection
  const alertReject = (saleId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are rejecting this claim!",
      icon: "question",
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
            RejectClaim("single", saleId, result.value);
          }
        });
      }
    });
  };

  const RejectClaim = async (type, saleId, reason) => {
    try {
      setLoading(true);
      if (type == "single") {
        let object = {
          admin: id,
          updated_by: id,
          updated_ip: secureLocalStorage.getItem("ip"),
          reason: reason.reason,
        };
        await UserService.rejectClaimById(object, saleId);
      } else if (type == "selected") {
        let object = {
          id: saleId,
          admin: id,
          updated_by: id,
          updated_ip: secureLocalStorage.getItem("ip"),
          reason: reason.reason,
        };

        await UserService.rejectSelectedClaims(object);
      } else if (type == "all") {
        let object = {
          admin: id,
          updated_by: id,
          updated_ip: secureLocalStorage.getItem("ip"),
          reason: reason.reason,
        };

        await UserService.rejectAllClaims(object);
      }

      getAllClaimsData();

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

  // endDateRef
  const changeStartDate = (e) => {
    let date = e;
    setStartDate(date);
    setIsRecords(true);
    setIsExport(true);
    setIsEndInvDate(false);
    setIsInvRecords(true);
    setIsInvExport(true);
    // $('.reacter-datepicker input[name="end"]').val("");
    dateInvRef.current.value = "";
    endDateRef.current.value = "";
    endDateInvRef.current.value = "";

    setIsEndDate(true);
  };

  const changeEndDate = (e) => {
    let date = e;
    setEndDate(date);
    setIsRecords(false);
    setIsExport(false);
    let startSplit = startDate.split("-");
    let endSplit = date.split("-");
    let date1 = new Date(startSplit[0], startSplit[1], startSplit[2]);
    let date2 = new Date(endSplit[0], endSplit[1], endSplit[2]);
    if (date2 < date1) {
      endDateRef.current.value = "";
      setIsRecords(true);
      setIsExport(true);
      toast.error("Ending date must be greater than starting date!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  // InvoiceDateRef
  const invoiceStartDate = (e) => {
    let date = e;
    setStartInvDate(date);
    setIsInvRecords(true);
    setIsInvExport(true);
    setIsEndDate(false);
    setIsRecords(true);
    setIsExport(true);
    $('.reacter-datepicker input[name="endInv"]').val("");
    dateRef.current.value = "";
    endDateRef.current.value = "";
    endDateInvRef.current.value = "";

    setIsEndInvDate(true);
  };

  const invoiceEndDate = (e) => {
    let date = e;
    setEndInvDate(date);
    setIsInvRecords(false);
    setIsInvExport(false);
    let startSplit = startInvDate.split("-");
    let endSplit = date.split("-");
    let date1 = new Date(startSplit[0], startSplit[1], startSplit[2]);
    let date2 = new Date(endSplit[0], endSplit[1], endSplit[2]);
    if (date2 < date1) {
      endDateInvRef.current.value = "";
      setIsInvRecords(true);
      setIsInvExport(true);
      toast.error("Ending date must be greater than starting date!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  // TODO if needs merge with search columns
  const showRecords = async () => {
    if (startDate && endDate) {
      try {
        setLoading(true);
        const response = await UserService.getSearchWithDateAllClaims(
          selectedCol,
          insertedVal,
          startDate,
          endDate,
          "",
          "",
          limit,
          1
        );
        const { data } = response;
        const { response: res } = data;
        setCurrentPage(1);
        setResultData(res);
        setTotalResults(data.records);
        setTotalPages(data.total_pages);
        setLimit(data.per_page);
        setLoading(false);
      } catch (err) {
        setIsExport(true);
        setResultData([]);
        setTotalResults("0");
        setTotalPages("1");
        setLoading(false);
      }
    } else {
      toast.error("Please select Filed Claim Start & End Dates", {
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
    // setLoading(true);

    // if record found then update the state
  };

  const showInvRecords = async () => {
    if (startInvDate && endInvDate) {
      try {
        setLoading(true);
        const response = await UserService.getSearchWithDateAllClaims(
          selectedCol,
          insertedVal,
          "",
          "",
          startInvDate,
          endInvDate,
          limit,
          1
        );
        const { data } = response;
        const { response: res } = data;

        setCurrentPage(1);
        setResultData(res);
        setTotalResults(data.records);
        setTotalPages(data.total_pages);
        setLimit(data.per_page);
        setLoading(false);
      } catch (err) {
        setResultData([]);
        setTotalResults("0");
        setTotalPages("1");
        setLoading(false);
      }
    } else {
      toast.error("Please select Invoice Start & End Dates", {
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
    // setLoading(true);

    // if record found then update the state
  };

  // TODO pending
  const changeDate = (e) => {
    setLoading(true);

    const getAllClaimsData = async () => {
      setLoading(true);
      if (id) {
        try {
          if (values.fieldtype === "" && values.searchval === "") {
            const response = await UserService.getSearchAllClaims(
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

            // handleSubmit();
          } else {
            // TODO userType missing, start date, end date
            const response = await UserService.getSearchWithDateAllClaims(
              values.fieldtype,
              values.searchval,
              e,
              e,
              limit
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
      }
    };
    getAllClaimsData();
  };

  const changeLimit = (e) => {
    let newLimit = e;
    setLimit(newLimit);
    const getAllClaimsData = async () => {
      setLoading(true);
      if (id) {
        try {
          if (
            values.fieldtype === "" &&
            values.searchval === "" &&
            dateRef.current.value === "" &&
            endDateRef.current.value === ""
          ) {
            const response = await UserService.getAllLatestClaims(newLimit);
            let resultData;
            // if (response.status === 206) {
            resultData = response.data.response;
            setResultData(resultData);
            setLimit(response.data.per_page);
            setCurrentPage(1);
            setLoading(false);
            // }
          } else if (
            dateRef.current.value !== "" &&
            endDateRef.current.value !== ""
          ) {
            if (
              dateRef.current.value !== "" &&
              endDateRef.current.value !== ""
            ) {
              const response = await UserService.getSearchWithDateAllClaims(
                selectedCol,
                insertedVal,
                dateRef.current.value,
                endDateRef.current.value,
                "",
                "",
                newLimit,
                1
              );
              let resultData;
              // if (response.status === 206) {
              resultData = response.data.response;
              setResultData(resultData);
              setTotalResults(response.data.records);
              setTotalPages(response.data.total_pages);
              setLimit(response.data.per_page);
              setCurrentPage(1);
              setLoading(false);
              // }
            }
          } else if (
            dateInvRef.current.value !== "" &&
            endDateInvRef.current.value !== ""
          ) {
            if (
              dateInvRef.current.value !== "" &&
              endDateInvRef.current.value !== ""
            ) {
              const response = await UserService.getSearchWithDateAllClaims(
                selectedCol,
                insertedVal,
                "",
                "",
                dateInvRef.current.value,
                endDateInvRef.current.value,
                newLimit,
                1
              );
              let resultData;
              // if (response.status === 206) {
              resultData = response.data.response;
              setResultData(resultData);
              setTotalResults(response.data.records);
              setTotalPages(response.data.total_pages);
              setLimit(response.data.per_page);
              setCurrentPage(1);
              setLoading(false);
              // }
            }
          } else if (values.fieldtype === "" && values.searchval === "") {
            if (
              dateRef.current.value !== "" &&
              endDateRef.current.value !== ""
            ) {
              const response = await UserService.getSearchAllClaims(
                "",
                dateRef.current.value,
                newLimit,
                1
              );
              let resultData;
              // if (response.status === 206) {
              resultData = response.data.response;
              setResultData(resultData);
              setTotalResults(response.data.records);
              setTotalPages(response.data.total_pages);
              setLimit(response.data.per_page);
              setCurrentPage(1);
              setLoading(false);
              // }
            }
          } else if (values.fieldtype === "" || values.searchval === "") {
            handleSubmit();
            setLoading(false);

            // search with limit
          } else if (values.fieldtype !== "" && values.searchval !== "") {
            if (
              dateRef.current.value !== "" &&
              endDateRef.current.value !== ""
            ) {
              // FIXME integrate with start, end date + userType missing
              const response = await UserService.getSearchWithDateAllClaims(
                values.fieldtype,
                values.searchval,
                dateRef.current.value,
                endDateRef.current.value,
                newLimit,
                1
              );
              let resultData;
              if (response.status === 206 || response.status === 200) {
                resultData = response.data.response;
                setResultData(resultData);
                setTotalResults(response.data.records);
                setTotalPages(response.data.total_pages);
                setLimit(response.data.per_page);
                setCurrentPage(1);
                setLoading(false);
              } else {
                setTotalResults("0");
                setTotalPages("1");
                setResultData([]);
                setLoading(false);
              }
            } else {
              const response = await UserService.getSearchWithoutDateAllClaims(
                values.fieldtype,
                values.searchval,
                newLimit
              );

              let resultData;
              if (response.status === 206 || response.status === 200) {
                setLoading(false);
                resultData = response.data.response;
                setResultData(resultData);
                setTotalResults(response.data.records);
                setTotalPages(response.data.total_pages);
                setCurrentPage(1);
                setLimit(response.data.per_page);
              } else {
                setTotalResults("0");
                setTotalPages("1");
                setResultData([]);
                setLoading(false);
                Swal.fire({
                  text: "Error fetching record",
                  icon: "error",
                  confirmButtonText: "Ok",
                });
              }
            }
          }
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
      }
    };
    getAllClaimsData();
  };

  // TODO user type pending
  const changePagination = (e) => {
    setCurrentPage(e);

    let pageNo = e;
    const getAllClaimsData = async () => {
      setLoading(true);
      if (id) {
        try {
          if (
            values.fieldtype === "" &&
            values.searchval === "" &&
            dateRef.current.value === "" &&
            endDateRef.current.value === "" &&
            dateInvRef.current.value === "" &&
            endDateInvRef.current.value === ""
          ) {
            // admin
            const response = await UserService.getPaginatedLatestClaims(
              pageNo,
              limit
            );

            let resultData;
            if (response.status === 206) {
              resultData = response.data.response;
              setResultData(resultData);
              setLimit(response.data.per_page);
              setLoading(false);
            }
          } else if (
            dateRef.current.value !== "" &&
            endDateRef.current.value !== ""
          ) {
            if (
              dateRef.current.value !== "" &&
              endDateRef.current.value !== ""
            ) {
              const response = await UserService.getPaginatedAllClaims(
                dateRef.current.value,
                endDateRef.current.value,
                "",
                "",
                pageNo,
                limit
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
          } else if (
            dateInvRef.current.value !== "" &&
            endDateInvRef.current.value !== ""
          ) {
            if (
              dateInvRef.current.value !== "" &&
              endDateInvRef.current.value !== ""
            ) {
              const response = await UserService.getPaginatedAllClaims(
                "",
                "",
                dateInvRef.current.value,
                endDateInvRef.current.value,
                pageNo,
                limit
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
          } else if (values.fieldtype === "" && values.searchval === "") {
            if (
              dateRef.current.value !== "" &&
              endDateRef.current.value !== ""
            ) {
              const response = await UserService.getSearchWithDateAllClaims(
                "",
                dateRef.current.value,
                endDateRef.current.value,
                limit,
                pageNo
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
          } else if (values.fieldtype === "" || values.searchval === "") {
            handleSubmit();
            setLoading(false);
          } else if (values.fieldtype !== "" && values.searchval !== "") {
            if (
              dateRef.current.value !== "" &&
              endDateRef.current.value !== ""
            ) {
              // TODO userType missing
              const response = await UserService.getSearchWithDateAllClaims(
                values.fieldtype,
                values.searchval,
                dateRef.current.value,
                endDateRef.current.value,
                limit,
                pageNo
              );
              let resultData;
              if (response.status === 206) {
                resultData = response.data.response;
                setResultData(resultData);
                setTotalResults(response.data.records);
                setTotalPages(response.data.total_pages);
                setLimit(response.data.per_page);

                setLoading(false);
              } else {
                setTotalResults("0");
                setTotalPages("1");
                setResultData([]);
                setLoading(false);
              }
            } else {
              const response = await UserService.getSearchAllClaims(
                values.fieldtype,
                values.searchval,
                limit,
                pageNo
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
                Swal.fire({
                  text: "Error fetching record",
                  icon: "error",
                  confirmButtonText: "Ok",
                });
              }
            }
          }
        } catch (err) {
          if (err?.response?.status === 404) {
            setLoading(false);
          } else {
            setLoading(false);
          }
        }
      }
    };
    getAllClaimsData();
  };

  // TODO invoice date search
  const searchData = async (action) => {
    setLoading(true);
    let resultData;
    try {
      // Filed claim dates
      if (
        dateRef.current.value === "" &&
        endDateRef.current.value === "" &&
        dateInvRef.current.value === "" &&
        endDateInvRef.current.value === ""
      ) {
        const response = await UserService.getSearchAllClaims(
          values.fieldtype,
          values.searchval,
          limit,
          1
        );

        if (response.status === 206) {
          setLoading(false);
          resultData = response.data.response;
          setResultData(resultData);
          setTotalResults(response.data.records);
          setTotalPages(response.data.total_pages);
          setCurrentPage(1);
          setLimit(response.data.per_page);
        } else {
          setTotalResults("0");
          setTotalPages("1");
          setResultData([]);
          setLoading(false);
          Swal.fire({
            text: "Error fetching record",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      } else {
        const response = await UserService.getSearchWithDateAllClaims(
          values.fieldtype,
          values.searchval,
          dateRef.current.value,
          endDateRef.current.value,
          dateInvRef.current.value,
          endDateInvRef.current.value,
          limit,
          1
        );
        resultData = response.data.response;
        setResultData(resultData);
        setTotalResults(response.data.records);
        setTotalPages(response.data.total_pages);
        setCurrentPage(1);
        setLimit(response.data.per_page);
        setLoading(false);
      }
    } catch (err) {
      setTotalPages("1");
      setTotalResults("0");

      if (err?.response?.status === 500) {
        setLoading(false);
        Swal.fire({
          text: "Something went wrong, try again",
          icon: "error",
          confirmButtonText: "Ok",
        });
      } else {
        setLoading(false);
        setResultData([]);
      }
    }
  };

  useLayoutEffect(() => {
    $(".export-selection").attr("href", "javascript:void(0)");
    getAllClaimsData();
  }, [id]);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      enableReinitialize: true,

      initialValues: {
        fieldtype: "",
        searchval: "",
      },
      validationSchema: quizSearch,
      onSubmit: (values, action) => {
        searchData(action);
      },
    });

  const Table = ({ data, rowsPerPage }) => {
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);
    const { items, requestSort, sortConfig } = useSortableData(slice);

    //FIXME Why Sorting missing
    const getClassNamesFor = (name) => {
      if (!sortConfig) {
        return;
      }
      return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    return (
      <>
        <table className="table-bordered caption-top align-middle table-borderless table-style-1">
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
                onClick={() => requestSort("index")}
                className={getClassNamesFor("index")}
              >
                No
              </th>
              <th
                scope="col"
                onClick={() => requestSort("employee")}
                className={getClassNamesFor("employee")}
              >
                User Info
              </th>
              <th
                scope="col"
                onClick={() => requestSort("invoice")}
                className={getClassNamesFor("invoice")}
              >
                Invoice No
              </th>

              <th
                scope="col"
                onClick={() => requestSort("retailerName")}
                className={getClassNamesFor("retailerName")}
              >
                Retailer Info
              </th>

              <th
                width="11%"
                scope="col"
                onClick={() => requestSort("product")}
                className={getClassNamesFor("product")}
              >
                Product Info
              </th>

              <th
                scope="col"
                onClick={() => requestSort("role")}
                className={getClassNamesFor("role")}
              >
                Role
              </th>

              <th
                scope="col"
                onClick={() => requestSort("quantity")}
                className={getClassNamesFor("quantity")}
              >
                QTY
              </th>

              <th
                scope="col"
                onClick={() => requestSort("total_price")}
                className={getClassNamesFor("total_price")}
              >
                Total Price
              </th>
              <th
                scope="col"
                onClick={() => requestSort("invoice")}
                className={getClassNamesFor("invoice")}
              >
                Invoice
              </th>

              <th
                scope="col"
                onClick={() => requestSort("action")}
                className={getClassNamesFor("action")}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.length ? (
              items.map((el, index) => (
                <tr key={el.salesID}>
                  <td>
                    <input
                      className="form-check-input select_one"
                      id={el.salesID}
                      value={el.salesID}
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
                    <ul className="rob-rollmann">
                      <li>
                        <b>Username:</b> {el.username}
                      </li>
                      <li>
                        <b>First Name:</b> {el.first_name}
                      </li>
                      <li>
                        <b>Last Name:</b> {el.last_name}
                      </li>
                      <li>
                        <b>Email:</b> {el.email}
                      </li>
                      <li>
                        <b>Employee #:</b> {el.empNum}
                      </li>
                    </ul>
                  </td>
                  <td>
                    <ul className="rob-rollmann">
                      <li>
                        <b>Invoice #:</b> {el.deliver_invoice}
                      </li>
                      <li>
                        <b>Invoice Date:</b>{" "}
                        {el.invoice_date === "0000-00-00"
                          ? "N/A"
                          : moment(el.invoice_date).format("MM-DD-YYYY")}
                      </li>
                      <li>
                        <b>Filed Claim:</b>{" "}
                        {el.created_at === "0000-00-00"
                          ? "N/A"
                          : moment(el.created_at).format("MM-DD-YYYY")}
                      </li>
                    </ul>
                  </td>
                  <td>
                    <ul className="rob-rollmann">
                      <li>
                        <b>Retailer:</b> {el.retailerName}
                      </li>
                    </ul>
                  </td>
                  <td>
                    <ul className="rob-rollmann">
                      <li>
                        <b>Levin SKU/Description/Bonus:</b>{" "}
                        {`${el.code}/${el.prodName}/$${el.price}`}
                      </li>
                    </ul>
                  </td>

                  <td>{el.role.toUpperCase()}</td>
                  <td>{el.ship_quantity}</td>

                  <td>${el.ship_quantity * el.price}</td>
                  <td>
                    <button
                      className="text-orange text-start"
                      loading="lazy"
                      onClick={() => {
                        setAttachment(
                          process.env.REACT_APP_IMAGE_Link + el.file
                        );
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      type="button"
                    >
                      See Attachment
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-success btn-sm"
                      onClick={() => alertAprove(el.salesID)}
                    >
                      <i className="bi bi-hand-thumbs-up-fill"></i>
                    </button>{" "}
                    <button
                      href=""
                      type="button"
                      className={`btn btn-danger btn-sm`}
                      // onClick={e => alert(e.id)}
                      onClick={() => alertReject(el.salesID)}
                    >
                      <i className="bi bi-hand-thumbs-down-fill"></i>
                    </button>{" "}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="text-center text-capitalize">
                  No record found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </>
    );
  };

  useEffect(() => {
    const getIp = async () => {
      const res = await axios.get("https://geolocation-db.com/json/");

      const weIp = res.data.IPv4;
      secureLocalStorage.setItem("ip", weIp);
    };
    getIp();
  }, [handleSubmit]);

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <div className="semi-dark">
        <div className="wrapper">
          <HeaderSidebar />

          <main className="page-content">
            <div className="manage-heading-2">
              <h2>
                All Claims <span>[{totalResults}]</span>
              </h2>
            </div>
            <div className="slides-here">
              <div className="alert alert-info">
                <b>Info!</b> You can search your required data by putting text
                in search box and <b>filter claims by date</b>
              </div>
              <div className="main-content-box">
                <div className="manage-territories-box mb-30">
                  <div className="row">
                    <div className="col-lg-12">
                      <h2 className="manage-territories-heading">All Claims</h2>
                    </div>
                    <div className="col-lg-10">
                      <form
                        className="row mt-3"
                        onSubmit={handleSubmit}
                        noValidate
                      >
                        <div className="col-lg-3">
                          <label>Filed Claim Start Date</label>
                          <div className="reacter-datepicker">
                            <input
                              type="date"
                              name="start"
                              ref={dateRef}
                              className="form-control"
                              onChange={(e) => {
                                changeStartDate(e.target.value);
                              }}
                              placeholder="mm-dd-yyyy"
                            />
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <label>Filed Claim End Date</label>
                          <div className="input-group">
                            <input
                              type="date"
                              name="end"
                              ref={endDateRef}
                              className="form-control"
                              onChange={(e) => changeEndDate(e.target.value)}
                              placeholder="mm-dd-yyyy"
                              disabled={!isEndDate}
                            />

                            <button
                              className="btn btn-primary back-orange show-records mt-0"
                              onClick={showRecords}
                              disabled={isRecords}
                              type="button"
                            >
                              Show records
                            </button>
                          </div>
                        </div>

                        <div className="col-lg-3">
                          <a
                            className="btn btn-primary back-orange export-rang w-100"
                            style={styles.range}
                            href={`${API_URL}export-range-claims-kings/normal/pending/${startDate}/${endDate}`}
                          >
                            Export by range
                          </a>
                        </div>

                        <hr className="mt-4 " />
                        <div className="col-lg-3">
                          <label>Invoice Start Date</label>
                          <div className="reacter-datepicker">
                            <input
                              type="date"
                              name="startInv"
                              ref={dateInvRef}
                              className="form-control"
                              onChange={(e) => {
                                invoiceStartDate(e.target.value);
                              }}
                              placeholder="mm-dd-yyyy"
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 ">
                          <label>Invoice End Date</label>
                          <div className="input-group">
                            <input
                              type="date"
                              name="endInv"
                              ref={endDateInvRef}
                              className="form-control"
                              onChange={(e) => invoiceEndDate(e.target.value)}
                              placeholder="mm-dd-yyyy"
                              disabled={!isEndInvDate}
                            />
                            <button
                              className="btn btn-primary back-orange show-records mt-0"
                              onClick={showInvRecords}
                              disabled={isInvRecords}
                              type="button"
                            >
                              Show records
                            </button>
                          </div>
                        </div>

                        <div className="col-lg-3 ">
                          <a
                            className="btn btn-primary back-orange export-rang w-100"
                            style={styles.invRange}
                            href={`${API_URL}export-range-invoice-claims-kings/normal/pending/${startInvDate}/${endInvDate}`}
                          >
                            Export by range
                          </a>
                        </div>

                        <hr className="mt-4 " />

                        <div className="col-lg-3 mt-2">
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
                            <option value="">Select</option>
                            <option value="1">Username</option>
                            <option value="2">First Name</option>
                            <option value="3">Last Name </option>
                            <option value="4">Email</option>
                            <option value="5">Employee #</option>
                            <option value="6">Invoice #</option>
                            <option value="7">Retailer</option>
                            <option value="13">Levin SKU</option>
                            <option value="12">Description</option>
                            <option value="17">Bonus</option>
                            <option value="15">Role</option>
                            <option value="16">Quantity</option>
                          </select>
                          {errors.fieldtype && touched.fieldtype ? (
                            <p className="help is-danger">{errors.fieldtype}</p>
                          ) : null}
                        </div>

                        <div className="col-lg-6 mt-2">
                          <div className="input-group">
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
                              value={values.searchval || ""}
                              placeholder="Enter something to search"
                              required
                            />

                            <button
                              className="btn btn-outline-secondary sebmit-dat"
                              type="submit"
                            >
                              Search
                            </button>
                          </div>
                          {errors.searchval && touched.searchval ? (
                            <p className="help is-danger">{errors.searchval}</p>
                          ) : null}
                        </div>

                        <div className="col-lg-3 mt-2">
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

                        {/* //TODO FIXME pending Reset Button */}
                      </form>
                    </div>

                    <div className="col-lg-2">
                      <div className="col-lg-12 mt-md-3">
                        <button
                          className="btn btn-outline-secondary reset w-100"
                          type="reset"
                          // onClick={() => getAllClaimsData()}
                          onClick={() => window.location.reload(false)}
                        >
                          Reset
                        </button>
                      </div>

                      <div className="col-lg-12 dropList mt-md-1">
                        <li className="dropdown1">
                          <button
                            className="btn btn-primary back-blue dropdown-toggle w-100"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Action
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <a
                                href={`${process.env.REACT_APP_API_Link}export-all-claims-kings/pending?time=${time}`}
                                className="dropdown-item"
                                style={{ cursor: "pointer" }}
                              >
                                Export All
                              </a>
                            </li>
                            {/* TODO link issue */}
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
                          </ul>
                        </li>

                        <li className="dropdown">
                          <button
                            className="btn btn-primary back-blue dropdown-toggle w-100"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Approve
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <a
                                className="dropdown-item"
                                style={{ cursor: "pointer" }}
                                onClick={acceptAll}
                              >
                                All
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                onClick={approveSelected}
                                style={{ cursor: "pointer" }}
                              >
                                Selected
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="dropdown">
                          <button
                            className="btn btn-primary back-blue dropdown-toggle w-100"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Reject
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <a
                                className="dropdown-item"
                                onClick={rejectAll}
                                style={{ cursor: "pointer" }}
                              >
                                All
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                onClick={rejectSelected}
                                style={{ cursor: "pointer" }}
                              >
                                Selected
                              </a>
                            </li>
                          </ul>
                        </li>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <MoveTable /> */}
                <div className="claim-table">
                  <Table data={resultData} rowsPerPage={limit} />
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
        <SeeAttachment src={attachment} />

        <ToastContainer />
      </div>
    </>
  );
}
