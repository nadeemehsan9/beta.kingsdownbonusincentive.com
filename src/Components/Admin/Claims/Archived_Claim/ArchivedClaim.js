import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import Pagination from "react-js-pagination";
import $ from "jquery";
import { quizSearch } from "../../../schema";
import moment from "moment";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import AdminFooter from "../../includes/AdminFooter";
import MoveTable from "../../includes/MoveTable";
import SeeAttachment from "../../includes/SeeAttachment";
import useSortableData from "../../../../hooks/useSortableData";
import UserService from "../../../../services/user.service";
import useWindowDimensions from "../../../../hooks/useWindowDimensions";
import useTable from "../../../../hooks/useTable";
import HeaderSidebar from "../../includes/HeaderSidebar";
import ToTop from "../../includes/ToTop";
import AdminListService from "../../../../services/admin-list.service";
import { Helmet } from "react-helmet";

export default function ArchivedClaim() {
  const TITLE = "Kings Down | Archived Claims";

  const API_URL = process.env.REACT_APP_API_Link;

  const state = useSelector((state) => state.stateVals);
  const { id, uType } = state;

  // const [loading, setLoading] = useState(true);
  const [fieldClass, setFieldClass] = useState("form-select blink-soft");
  const [loading, setLoading] = useState(false);

  const [attachment, setAttachment] = useState("");

  const [years, setYears] = useState([]);
  const [limit, setLimit] = useState("10");
  const [year, setYear] = useState("");
  const [resultData, setResultData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState("0");
  const [totalPages, setTotalPages] = useState("1");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [startInvDate, setStartInvDate] = useState("");
  const [endInvDate, setEndInvDate] = useState("");

  const [checkedValues, setCheckedValues] = useState("");

  const [selectedCol, setSelectedCol] = useState("");
  const [insertedVal, setInsertedVal] = useState("");
  const [isEndDate, setIsEndDate] = useState(false);
  const [isYear, setIsYear] = useState(false);
  const [isRecords, setIsRecords] = useState(true);
  const [isExport, setIsExport] = useState(true);

  const [isEndInvDate, setIsEndInvDate] = useState(false);
  const [isInvRecords, setIsInvRecords] = useState(true);
  const [isInvExport, setIsInvExport] = useState(true);
  const date1 = new Date();
  var time = date1.getTime();

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

  var curr = new Date();
  curr.setDate(curr.getDate() + 3);
  var date = curr.toISOString().substring(0, 10);

  const changeColumn = (e) => {
    setSelectedCol(e.target.value);
  };

  const changeValue = (e) => {
    setInsertedVal(e.target.value);
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
      `https://claims-api.elitestacks.com/v1/export-selected-claims-kings/${selectedRecords}?time=${time}`
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
      `https://claims-api.elitestacks.com/v1/export-selected-claims-kings/${allSelections}?time=${time}`
    );
  };

  // FIXME
  useEffect(() => {
    setCheckedValues(singleSelections);
  }, [singleSelections]);

  const changeYear = (e) => {
    if (e.target.value != "") {
      setFieldClass("form-select");
    } else {
      setFieldClass("form-select blink-soft");
    }
    let date = e.target.value;
    //TODO will be used later setYear
    if (date !== "") {
      getArchiveClaimsData(date);
      setIsRecords(true);
      setIsExport(true);
      setIsYear(true);
    } else {
      setIsRecords(false);
      setIsExport(false);
      setIsYear(false);
      setResultData([]);
      setTotalResults("0");
    }
    setYear(date);

    $('.reacter-datepicker input[name="end"]').val("");
    $('.reacter-datepicker input[name="start"]').val("");
    dateRef.value = "";
    endDateRef.value = "";
  };

  // TODO endDateRef
  const changeStartDate = (e) => {
    let date = e;
    setStartDate(date);
    setIsRecords(true);
    setIsExport(true);
    setIsEndInvDate(false);
    setIsInvRecords(true);
    setIsInvExport(true);
    $('.reacter-datepicker input[name="end"]').val("");
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
    // TODO
    if (startDate && endDate) {
      try {
        setLoading(true);
        if (selectedCol !== "" && insertedVal !== "") {
          const response =
            await UserService.getSearchWithDatesAllArchivedClaims(
              year,
              selectedCol,
              insertedVal,
              startDate,
              endDate,
              limit,
              1
            );
          const { data } = response;
          const { response: res } = data;
          console.log(data.records);
          setResultData(res);
          setTotalResults(data.records);
          setTotalPages(data.total_pages);
          setLimit(data.per_page);
          setLoading(false);
          $(".export-rang").attr(
            "href",
            `${API_URL}user/claim/admin/export-range-claims/approved/${startDate}/${endDate}?time=${time}`
          );
        } else {
          const response = await UserService.getSearchWithDateAllArchivedClaims(
            year,
            startDate,
            endDate,
            "",
            "",
            limit,
            1
          );
          const { data } = response;
          const { response: res } = data;
          console.log(data.records);
          setResultData(res);
          setTotalResults(data.records);
          setTotalPages(data.total_pages);
          setLimit(data.per_page);
          setLoading(false);
          $(".export-rang").attr(
            "href",
            `${API_URL}user/claim/admin/export-range-claims/approved/${startDate}/${endDate}?time=${time}`
          );
        }
      } catch (err) {
        setIsExport(true);
        setResultData([]);
        setTotalResults("0");
        setTotalPages("1");
        setLoading(false);
        $(".export-rang").attr("href", `javascript:void(0)`);
      }
    } else {
      toast.error("Please select starting & ending dates", {
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
    // TODO
    // console.log("start="+startInvDate+"\nend="+endInvDate);
    if (startInvDate && endInvDate) {
      try {
        setLoading(true);
        const response = await UserService.getSearchWithDateAllArchivedClaims(
          year,
          "",
          "",
          startInvDate,
          endInvDate,
          limit,
          1
        );
        const { data } = response;
        const { response: res } = data;
        // console.log(data.records);
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
            const response = await UserService.getSearchAllArchivedClaims(
              year,
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
            const response =
              await UserService.getSearchWithDateAllArchivedClaims(
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
            const response = await UserService.getAllArchivedClaims(
              year,
              newLimit
            );
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
            endDateRef.current.value !== "" &&
            values.fieldtype === "" &&
            values.searchval === ""
          ) {
            console.log("date limiting");
            if (
              dateRef.current.value !== "" &&
              endDateRef.current.value !== ""
            ) {
              const response =
                await UserService.getSearchWithDateAllArchivedClaims(
                  year,
                  dateRef.current.value,
                  endDateRef.current.value,
                  newLimit
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
            dateRef.current.value !== "" &&
            endDateRef.current.value !== "" &&
            values.fieldtype !== "" &&
            values.searchval !== ""
          ) {
            console.log("date limiting");
            if (
              dateRef.current.value !== "" &&
              endDateRef.current.value !== ""
            ) {
              const response =
                await UserService.getSearchWithDatesAllArchivedClaims(
                  year,
                  values.fieldtype,
                  values.searchval,
                  dateRef.current.value,
                  endDateRef.current.value,
                  newLimit
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
            console.log("testing");
            if (
              dateRef.current.value !== "" &&
              endDateRef.current.value !== ""
            ) {
              const response = await UserService.getSearchAllArchivedClaims(
                "",
                dateRef.current.value,
                newLimit,
                year,
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
              console.log("limiting");
              // FIXME integrate with start, end date + userType missing
              const response =
                await UserService.getSearchWithDatesAllArchivedClaims(
                  year,
                  values.fieldtype,
                  values.searchval,
                  dateRef.current.value,
                  endDateRef.current.value,
                  newLimit
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
              // FIXME change limit with search fields
              console.log(values);
              const response =
                await UserService.getSearchWithoutDateAllArchivedClaims(
                  year,
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
          console.log(err);
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
    // console.log(e)

    let pageNo = e;
    // setLimit(newLimit);
    // console.log(limit);
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
            const response = await UserService.getPaginatedAllArchivedClaims(
              year,
              "",
              "",
              "",
              "",
              pageNo,
              limit
            );
            // console.log(response);
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
              const response = await UserService.getPaginatedAllArchivedClaims(
                year,
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
              const response = await UserService.getPaginatedAllArchivedClaims(
                year,
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
              const response =
                await UserService.getSearchWithDateAllArchivedClaims(
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
              const response =
                await UserService.getSearchWithDateAllArchivedClaims(
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
              const response = await UserService.getSearchAllArchivedClaims(
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
          console.log(err);
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

  const searchData = async (action) => {
    setLoading(true);

    try {
      if (dateRef.current.value === "" && endDateRef.current.value === "") {
        console.log("searching...");

        const response = await UserService.getSearchAllArchivedClaims(
          year,
          values.fieldtype,
          values.searchval,
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
        console.log(values);
        const response = await UserService.getSearchWithDatesAllArchivedClaims(
          year,
          values.fieldtype,
          values.searchval,
          dateRef.current.value,
          endDateRef.current.value,
          limit,
          1
        );
        let resultData;
        if (response.status === 206) {
          resultData = response.data.response;
          setResultData(resultData);
          setTotalResults(response.data.records);
          setTotalPages(response.data.total_pages);
          setCurrentPage(1);
          setLimit(response.data.per_page);
          setLoading(false);
        }
      }
    } catch (err) {
      setTotalPages("1");
      setTotalResults("0");
      console.log(err?.response?.status);
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

  // FIXME call this function on changeYear()
  useLayoutEffect(() => {
    $(".export-selection").attr("href", "javascript:void(0)");

    const getYears = async () => {
      const { data } = await UserService.getAllYears();

      const { response: res } = data;
      const results = [];

      res.map((value) => {
        results.push({
          key: value,
          value: value,
        });
      });
      setYears([{ key: "Select Filed Claim Year", value: "" }, ...results]);
    };
    getYears();
  }, [id]);

  const getArchiveClaimsData = async (date) => {
    setLoading(true);
    if (id) {
      try {
        // TODO user type service missing
        const response = await UserService.getAllArchivedClaims(date, limit);

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
    }
  };

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
                onClick={() => requestSort("description")}
                className={getClassNamesFor("description")}
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
                Qty
              </th>

              <th
                scope="col"
                onClick={() => requestSort("total_price")}
                className={getClassNamesFor("total_price")}
              >
                Total Price
              </th>
              <th
                width="8%"
                scope="col"
                onClick={() => requestSort("claim_by")}
                className={getClassNamesFor("claim_by")}
              >
                Accepted By
              </th>
              <th
                scope="col"
                onClick={() => requestSort("invoice")}
                className={getClassNamesFor("invoice")}
              >
                Invoice
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
                        <b>Levin Sku/Description/Bonus:</b>{" "}
                        {`${el.sku}/${el.description}/$${el.bonus}`}
                      </li>
                    </ul>
                  </td>

                  <td>{el.role.toUpperCase()}</td>
                  <td>{el.ship_quantity}</td>

                  <td>
                    $
                    {el.custom_price == "no"
                      ? el.price * el.ship_quantity
                      : el.reward}
                  </td>
                  <td>
                    {" "}
                    {`${el.claim_by}`} on <br />
                    {el.updated_at === "0000-00-00"
                      ? "N/A"
                      : moment(el.updated_at).format("MM-DD-YYYY")}
                    {/* {`${el.updated_at}`} */}
                  </td>
                  <td>
                    <button
                      className="text-orange text-start"
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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="14" className="text-center text-capitalize">
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
      const res = await axios.get("https://api.ipify.org?format=json");

      const weIp = res.data.ip;
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
                All Archived Claims <span>[{totalResults}]</span>
              </h2>
            </div>
            <div className="slides-here">
              <div className="alert alert-info">
                <b>Info!</b> You can search your required data by putting text
                in search box
              </div>
              <div className="main-content-box">
                <div className="manage-territories-box mb-30">
                  <div className="row">
                    <div className="col-lg-12">
                      <h2 className="manage-territories-heading">
                        All Archived Claims
                      </h2>
                    </div>
                    <div className="col-lg-12 mb-2">
                      <select
                        className={fieldClass}
                        onChange={(e) => {
                          changeYear(e);
                        }}
                      >
                        {years.map((res) => {
                          return (
                            <option key={res.value} value={res.value}>
                              {res.key}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="col-lg-3">
                      <label>Filed Claim Start Date</label>
                      <div className="reacter-datepicker">
                        <input
                          type="date"
                          name="start"
                          ref={dateRef}
                          className="form-control"
                          min={`${year}-01-01`}
                          max={`${year}-12-31`}
                          onChange={(e) => {
                            changeStartDate(e.target.value);
                          }}
                          placeholder="mm-dd-yyyy"
                          disabled={!isYear}
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
                          min={`${year}-01-01`}
                          max={`${year}-12-31`}
                          onChange={(e) => changeEndDate(e.target.value)}
                          placeholder="mm-dd-yyyy"
                          disabled={!isEndDate}
                        />
                        <button
                          className="btn btn-primary back-orange show-records mt-0"
                          onClick={showRecords}
                          disabled={isRecords}
                        >
                          Show records
                        </button>
                      </div>
                    </div>

                    <div className="col-lg-3">
                      <a
                        className="btn btn-primary back-orange export-rang w-100"
                        style={styles.range}
                        href={`${API_URL}export-range-claims-kings/archive/approved/${startDate}/${endDate}?time=${time}`}
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
                          min={`${year}-01-01`}
                          max={`${year}-12-31`}
                          onChange={(e) => {
                            invoiceStartDate(e.target.value);
                          }}
                          placeholder="mm-dd-yyyy"
                          disabled={!isYear}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <label>Invoice End Date</label>
                      <div className="input-group">
                        <input
                          type="date"
                          name="endInv"
                          ref={endDateInvRef}
                          className="form-control"
                          min={`${year}-01-01`}
                          max={`${year}-12-31`}
                          onChange={(e) => invoiceEndDate(e.target.value)}
                          placeholder="mm-dd-yyyy"
                          disabled={!isEndInvDate}
                        />
                        <button
                          className="btn btn-primary back-orange show-records mt-0"
                          onClick={showInvRecords}
                          disabled={isInvRecords}
                        >
                          Show records
                        </button>
                      </div>
                    </div>

                    {/* FIXME */}
                    <div className="col-lg-3">
                      <a
                        className="btn btn-primary back-orange export-rang w-100"
                        style={styles.invRange}
                        href={`${API_URL}export-range-invoice-claims-kings/archive/approved/${startInvDate}/${endInvDate}?time=${time}`}
                      >
                        Export by range
                      </a>
                    </div>
                  </div>

                  <hr className="mt-4 " />

                  <form onSubmit={handleSubmit} noValidate>
                    <div className="row mt-3">
                      <div className="col-lg-3">
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
                          disabled={!isYear}
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

                      <div className="col-lg-4 ">
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
                            placeholder="Enter something to search"
                            name="searchval"
                            value={values.searchval || ""}
                            required
                            disabled={!isYear}
                          />

                          <button
                            className="btn btn-outline-secondary sebmit-dat"
                            type="submit"
                            disabled={!isYear}
                          >
                            Search
                          </button>
                        </div>
                        {errors.searchval && touched.searchval ? (
                          <p className="help is-danger">{errors.searchval}</p>
                        ) : null}
                      </div>

                      <div className="col-lg-2 ">
                        <select
                          className="form-select"
                          value={limit}
                          onChange={(e) => changeLimit(e.target.value)}
                          disabled={!isYear}
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
                      <div className="col-lg-1">
                        <button
                          className="btn btn-outline-secondary archReset"
                          onClick={() => window.location.reload(false)}
                          disabled={!isYear}
                          type="button"
                        >
                          Reset
                        </button>
                      </div>

                      <div className="col-lg-1 dropList mt-0">
                        <li className="dropdown1">
                          <button
                            className="btn btn-primary back-blue dropdown-toggle archAction"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            disabled={!isYear}
                          >
                            Action
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <a
                                href={`${process.env.REACT_APP_API_Link}export-yearly-claims-kings/${year}?time=${time}`}
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
