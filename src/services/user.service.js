import axios from "axios";

import secureLocalStorage from "react-secure-storage";
import authHeader from "./authHeader";

const API_URL = process.env.REACT_APP_API_Link;

const login = (values) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.post(
    API_URL + "login-user",
    {
      username: values.name,
      password: values.password,
    },
    {
      headers: headers,
    }
  );
};

const forgotPass = (values) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.post(
    API_URL + "forgot-password",
    {
      email: values.email,
    },
    {
      headers: headers,
    }
  );
};
const AdminforgotPass = (values) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.post(
    API_URL + "forgot-password",
    {
      email: values.email,
    },
    {
      headers: headers,
    }
  );
};

const changePass = (values, forgotToken) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.put(
    API_URL + "update-password/" + forgotToken,
    {
      password: values.password,
      updated_ip: secureLocalStorage.getItem("ip"),
    },
    {
      headers: headers,
    }
  );
};

const checkToken = (token) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "check-forgot-token/" + token, {
    headers: headers,
  });
};

const validateProfileEmail = (values, id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL + "check-profile-email-exist/" + id + "/" + values.email,
    {
      headers: headers,
    }
  );
};

const getProfile = (accessToken) => {
  return axios.get(API_URL + "get-profile", {
    headers: authHeader(accessToken),
  });
};

const getUserState = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "states", {
    headers: headers,
  });
};

const getCityByStateId = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "city-by-state/" + id, {
    headers: headers,
  });
};

const SubmitClaim = (formData, id, rid) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  return axios.post(
    API_URL + "submit-claim-kings/" + id + "/" + rid,
    formData,
    {
      headers: headers,
    }
  );
};

const rejectClaimById = (formData, id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.post(API_URL + "reject-claim-clm/" + id, formData, {
    headers: headers,
  });
};
const acceptClaimById = (formData, id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.post(API_URL + "accept-claim-clm/" + id, formData, {
    headers: headers,
  });
};

const acceptSelectedClaims = (formData) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.post(API_URL + "accept-selected-claims-clm", formData, {
    headers: headers,
  });
};

const acceptAllClaims = (formData) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.post(API_URL + "accept-all-claims-clm", formData, {
    headers: headers,
  });
};

const rejectSelectedClaims = (formData) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.post(API_URL + "reject-selected-claims-clm", formData, {
    headers: headers,
  });
};

const updateClaimPending = (formData, id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.put(`${API_URL}pending-claim/${id}`, formData, {
    headers: headers,
  });
};

const rejectAllClaims = (formData) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.post(API_URL + "reject-all-claims-clm", formData, {
    headers: headers,
  });
};

const getProdPrice = (uId, pId, sId) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "get-product-price/" + pId + "/" + sId, {
    headers: headers,
  });
};

const contact = (values) => {
  console.log(JSON.stringify(values));
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.post(
    API_URL + "user/contact-submit",
    {
      subject: values.subject,
      name: values.name,
      phone: values.phone,
      email: values.email,
      contactback: values.contactback,
      question: values.question,
    },
    {
      headers: headers,
    }
  );
};

const UpdateUserInfo = (values, id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.put(
    API_URL + "update-user/" + id,
    {
      first_name: values.fname,
      last_name: values.lname,
      email: values.email,
      zip: values.zipcode,
      address1: values.address1,
      address2: values.address2,
      fax: values.fax,
      phone: values.phone,
      retailer_id: values.retailer,

      state_id: values.stateprov2,
      city_id: values.city2,
      updated_by: id,

      updated_ip: secureLocalStorage.getItem("ip"),
    },
    {
      headers: headers,
    }
  );
};

const UpdateAdminInfo = (values, id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.put(
    API_URL + "update-admin/" + id,
    {
      first_name: values.fname,
      last_name: values.lname,
      email: values.email,
      state_id: values.state,
      city_id: values.city,
      zip: values.zipcode,
      address1: values.address1,
      phone: values.phone,
      updated_by: id,

      updated_ip: secureLocalStorage.getItem("ip"),
    },
    {
      headers: headers,
    }
  );
};

const UpdateAdminInfoWithPass = (values, id, pass) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.put(
    API_URL + "update-admin/" + id,
    {
      first_name: values.fname,
      last_name: values.lname,
      email: values.email,
      state_id: values.state,
      city_id: values.city,
      zip: values.zipcode,
      address1: values.address1,
      phone: values.phone,
      updated_by: id,
      password: pass,
      updated_ip: secureLocalStorage.getItem("ip"),
    },
    {
      headers: headers,
    }
  );
};

// recent claims welcome page
const recentClaim = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "user-recent-claims-kings/" + id, {
    headers: headers,
  });
};

const getClaimDetail = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "get-claim-detail-kings/" + id, {
    headers: headers,
  });
};

const checkClaimStatus = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(`${API_URL}get-claim-status/${id}`, {
    headers: headers,
  });
};

// Previous claims page
const getPrevClaimstById = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "user-previous-claims-kings/" + id, {
    headers: headers,
  });
};

const getLimitPrevClaimstById = (id, limit) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL +
      "user-previous-claims-kings/" +
      id +
      "?limit=" +
      limit +
      "&page=1",
    {
      headers: headers,
    }
  );
};

const getAllLatestClaims = (limit) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL + "list-latest-claims" + "?limit=" + limit + "&page=1",
    {
      headers: headers,
    }
  );
};
const getAllLatestClaimsStats = (
  id,
  limit,
  pageNo,
  col,
  val,
  startDate,
  endDate,
  invoiceStart,
  invoiceEnd
) => {
  if (col === "1") {
    col = "username";
  } else if (col === "2") {
    col = "first_name";
  } else if (col === "3") {
    col = "last_name";
  } else if (col === "4") {
    col = "email";
  } else if (col === "5") {
    col = "employee";
  } else if (col === "6") {
    col = "invoice";
  } else if (col === "7") {
    col = "account";
  } else if (col === "8") {
    col = "store";
  } else if (col === "9") {
    col = "state";
  } else if (col === "10") {
    col = "city";
  } else if (col === "11") {
    col = "zip";
  } else if (col === "12") {
    col = "prodName";
  } else if (col === "13") {
    col = "prodCode";
  } else if (col === "14") {
    col = "splitStatus";
  } else if (col === "15") {
    col = "role";
  } else if (col === "16") {
    col = "quantity";
  } else if (col === "17") {
    col = "price";
  } else if (col === "18") {
    col = "totalPrice";
  }
  const headers = {
    "Content-Type": "application/json",
  };
  let query = ``;
  if (startDate && endDate) {
    query = `${API_URL}user/stats/get-claim-detail/${id}?${col}=${val}&startDate=${startDate}&endDate=${endDate}&limit=${limit}&page${pageNo}`;
  } else if (invoiceStart && invoiceEnd) {
    query = `${API_URL}user/stats/get-claim-detail/${id}?${col}=${val}&invoiceStart=${invoiceStart}&invoiceEnd=${invoiceEnd}&page=${pageNo}&limit=${limit}`;
  } else if (limit && pageNo) {
    query = `${API_URL}user/stats/get-claim-detail/${id}&limit=${limit}&page${pageNo}`;
  } else if (limit) {
    query = `${API_URL}user/stats/get-claim-detail/${id}&limit=${limit}`;
  } else if (pageNo) {
    query = `${API_URL}user/stats/get-claim-detail/${id}&page=${pageNo}`;
  } else {
    query = `${API_URL}user/stats/get-claim-detail/${id}`;
  }

  return axios.get(query, {
    headers: headers,
  });
};

const getAllYears = () => {
  const headers = {
    "Content-Type": "application/json",
  };

  return axios.get(`${API_URL}list-years`, {
    headers: headers,
  });
};

const getAllArchivedClaims = (year, limit) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL + "list-year-claims/" + year + "?limit=" + limit + "&page=1",
    {
      headers: headers,
    }
  );
};

const getAllAcceptedClaims = (limit) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL + "list-accepted-claims" + "?limit=" + limit + "&page=1",
    {
      headers: headers,
    }
  );
};

const getAllRejectedClaims = (limit) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL + "list-rejected-claims" + "?limit=" + limit + "&page=1",
    {
      headers: headers,
    }
  );
};

const getPaginatedPrevClaimstById = (id, pageNo, limit) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL +
      "user-previous-claims-kings/" +
      id +
      "?page=" +
      pageNo +
      "&limit=" +
      limit,
    {
      headers: headers,
    }
  );
};

const getPaginatedLatestClaims = (pageNo, limit) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL + "list-latest-claims" + "?page=" + pageNo + "&limit=" + limit,
    {
      headers: headers,
    }
  );
};

const getPaginatedAcceptedClaims = (pageNo, limit) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL + "list-accepted-claims" + "?page=" + pageNo + "&limit=" + limit,
    {
      headers: headers,
    }
  );
};

const getPaginatedRejectedClaims = (pageNo, limit) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL + "list-rejected-claims" + "?page=" + pageNo + "&limit=" + limit,
    {
      headers: headers,
    }
  );
};
const getSearchPrevClaimstById = (id, col, val, limit, pageNo) => {
  if (col === "1") {
    col = "invoice";
  } else if (col === "2") {
    col = "product";
  } else if (col === "3") {
    col = "size";
  } else if (col === "4") {
    col = "quantity";
  } else if (col === "5") {
    col = "spiff";
  } else if (col === "6") {
    col = "upc";
  } else if (col === "7") {
    col = "sale_status";
  } else {
    col = "invoice_date";
  }
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL +
      "user-previous-claims-kings/" +
      id +
      "?" +
      col +
      "=" +
      val +
      "&limit=" +
      limit +
      "&page=" +
      pageNo,
    {
      headers: headers,
    }
  );
};

const getSearchAllClaims = (col, val, limit, pageNo) => {
  if (col === "1") {
    col = "username";
  } else if (col === "2") {
    col = "first_name";
  } else if (col === "3") {
    col = "last_name";
  } else if (col === "4") {
    col = "email";
  } else if (col === "5") {
    col = "employee";
  } else if (col === "6") {
    col = "invoice";
  } else if (col === "7") {
    col = "retailer";
  } else if (col === "12") {
    col = "product";
  } else if (col === "13") {
    col = "upc";
  } else if (col === "14") {
    col = "size";
  } else if (col === "15") {
    col = "role";
  } else if (col === "16") {
    col = "quantity";
  } else if (col === "17") {
    col = "spiff";
  } else if (col === "18") {
    col = "totalPrice";
  }
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL +
      "list-latest-claims" +
      "?" +
      col +
      "=" +
      val +
      "&limit=" +
      limit +
      "&page=" +
      pageNo,
    {
      headers: headers,
    }
  );
};

const getSearchAllArchivedClaims = (year, col, val, limit, pageNo) => {
  if (col === "1") {
    col = "username";
  } else if (col === "2") {
    col = "first_name";
  } else if (col === "3") {
    col = "last_name";
  } else if (col === "4") {
    col = "email";
  } else if (col === "5") {
    col = "employee";
  } else if (col === "6") {
    col = "invoice";
  } else if (col === "7") {
    col = "retailer";
  } else if (col === "12") {
    col = "product";
  } else if (col === "13") {
    col = "upc";
  } else if (col === "14") {
    col = "size";
  } else if (col === "15") {
    col = "role";
  } else if (col === "16") {
    col = "quantity";
  } else if (col === "17") {
    col = "spiff";
  } else if (col === "18") {
    col = "totalPrice";
  }
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    `${API_URL}list-year-claims/${year}?${col}=${val}&limit=${limit}&page=${pageNo}`,
    {
      headers: headers,
    }
  );
};

const getSearchAllAcceptedClaims = (col, val, limit, pageNo) => {
  if (col === "1") {
    col = "username";
  } else if (col === "2") {
    col = "first_name";
  } else if (col === "3") {
    col = "last_name";
  } else if (col === "4") {
    col = "email";
  } else if (col === "5") {
    col = "employee";
  } else if (col === "6") {
    col = "invoice";
  } else if (col === "7") {
    col = "retailer";
  } else if (col === "12") {
    col = "product";
  } else if (col === "13") {
    col = "upc";
  } else if (col === "14") {
    col = "size";
  } else if (col === "15") {
    col = "role";
  } else if (col === "16") {
    col = "quantity";
  } else if (col === "17") {
    col = "spiff";
  } else if (col === "18") {
    col = "totalPrice";
  }
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL +
      "list-accepted-claims" +
      "?" +
      col +
      "=" +
      val +
      "&limit=" +
      limit +
      "&page=" +
      pageNo,
    {
      headers: headers,
    }
  );
};

const getSearchAllRejectedClaims = (col, val, limit, pageNo) => {
  if (col === "1") {
    col = "username";
  } else if (col === "2") {
    col = "first_name";
  } else if (col === "3") {
    col = "last_name";
  } else if (col === "4") {
    col = "email";
  } else if (col === "5") {
    col = "employee";
  } else if (col === "6") {
    col = "invoice";
  } else if (col === "7") {
    col = "retailer";
  } else if (col === "12") {
    col = "product";
  } else if (col === "13") {
    col = "upc";
  } else if (col === "14") {
    col = "size";
  } else if (col === "15") {
    col = "role";
  } else if (col === "16") {
    col = "quantity";
  } else if (col === "17") {
    col = "spiff";
  } else if (col === "18") {
    col = "totalPrice";
  }
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL +
      "list-rejected-claims" +
      "?" +
      col +
      "=" +
      val +
      "&limit=" +
      limit +
      "&page=" +
      pageNo,
    {
      headers: headers,
    }
  );
};

const getSearchWithDatePrevClaimstById = (id, col, val, invoiceDate, limit) => {
  if (col === "1") {
    col = "invoice";
  } else if (col === "2") {
    col = "product";
  } else if (col === "3") {
    col = "size";
  } else if (col === "4") {
    col = "quantity";
  } else if (col === "5") {
    col = "amount";
  } else if (col === "6") {
    col = "store";
  } else if (col === "7") {
    col = "city";
  } else if (col === "8") {
    col = "state";
  } else if (col === "9") {
    col = "sale_statu";
  }
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL +
      "user-previous-claims-kings/" +
      id +
      "?" +
      col +
      "=" +
      val +
      "&invoice_date=" +
      invoiceDate +
      "&limit=" +
      limit,
    {
      headers: headers,
    }
  );
};

const getSearchWithoutDateAllClaims = (col, val, limit) => {
  if (col === "1") {
    col = "username";
  } else if (col === "2") {
    col = "first_name";
  } else if (col === "3") {
    col = "last_name";
  } else if (col === "4") {
    col = "email";
  } else if (col === "5") {
    col = "employee";
  } else if (col === "6") {
    col = "invoice";
  } else if (col === "7") {
    col = "account";
  } else if (col === "8") {
    col = "store";
  } else if (col === "9") {
    col = "state";
  } else if (col === "10") {
    col = "city";
  } else if (col === "11") {
    col = "zip";
  } else if (col === "12") {
    col = "prodName";
  } else if (col === "13") {
    col = "prodCode";
  } else if (col === "14") {
    col = "splitStatus";
  } else if (col === "15") {
    col = "role";
  } else if (col === "16") {
    col = "quantity";
  } else if (col === "17") {
    col = "price";
  } else {
    col = "totalPrice";
  }
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL + "list-latest-claims" + "?" + col + "=" + val + "&limit=" + limit,
    {
      headers: headers,
    }
  );
};
const getSearchWithoutDateAllArchivedClaims = (year, col, val, limit) => {
  if (col === "1") {
    col = "username";
  } else if (col === "2") {
    col = "first_name";
  } else if (col === "3") {
    col = "last_name";
  } else if (col === "4") {
    col = "email";
  } else if (col === "5") {
    col = "employee";
  } else if (col === "6") {
    col = "invoice";
  } else if (col === "7") {
    col = "invoice_date";
  } else if (col === "8") {
    col = "created_at";
  } else if (col === "9") {
    col = "account";
  } else if (col === "10") {
    col = "store";
  } else if (col === "11") {
    col = "state";
  } else if (col === "12") {
    col = "city";
  } else if (col === "13") {
    col = "zip";
  } else if (col === "14") {
    col = "product";
  } else if (col === "15") {
    col = "size";
  } else if (col === "16") {
    col = "status";
  } else if (col === "17") {
    col = "role";
  } else if (col === "18") {
    col = "quantity";
  } else if (col === "19") {
    col = "price";
  }
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL +
      "list-year-claims/" +
      year +
      "?" +
      col +
      "=" +
      val +
      "&limit=" +
      limit,
    {
      headers: headers,
    }
  );
};

const getSearchWithoutDateAcceptedClaims = (col, val, limit) => {
  if (col === "1") {
    col = "username";
  } else if (col === "2") {
    col = "first_name";
  } else if (col === "3") {
    col = "last_name";
  } else if (col === "4") {
    col = "email";
  } else if (col === "5") {
    col = "employee";
  } else if (col === "6") {
    col = "invoice";
  } else if (col === "7") {
    col = "account";
  } else if (col === "8") {
    col = "store";
  } else if (col === "9") {
    col = "state";
  } else if (col === "10") {
    col = "city";
  } else if (col === "11") {
    col = "zip";
  } else if (col === "12") {
    col = "product";
  } else if (col === "13") {
    col = "prodCode";
  } else if (col === "14") {
    col = "splitStatus";
  } else if (col === "15") {
    col = "role";
  } else if (col === "16") {
    col = "quantity";
  } else if (col === "17") {
    col = "price";
  } else {
    col = "totalPrice";
  }
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL +
      "list-accepted-claims" +
      "?" +
      col +
      "=" +
      val +
      "&limit=" +
      limit,
    {
      headers: headers,
    }
  );
};
const getSearchWithoutDateRejectedClaims = (col, val, limit) => {
  if (col === "1") {
    col = "username";
  } else if (col === "2") {
    col = "first_name";
  } else if (col === "3") {
    col = "last_name";
  } else if (col === "4") {
    col = "email";
  } else if (col === "5") {
    col = "employee";
  } else if (col === "6") {
    col = "invoice";
  } else if (col === "7") {
    col = "account";
  } else if (col === "8") {
    col = "store";
  } else if (col === "9") {
    col = "state";
  } else if (col === "10") {
    col = "city";
  } else if (col === "11") {
    col = "zip";
  } else if (col === "12") {
    col = "product";
  } else if (col === "13") {
    col = "prodCode";
  } else if (col === "14") {
    col = "splitStatus";
  } else if (col === "15") {
    col = "role";
  } else if (col === "16") {
    col = "quantity";
  } else if (col === "17") {
    col = "price";
  } else {
    col = "totalPrice";
  }
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL +
      "list-rejected-claims" +
      "?" +
      col +
      "=" +
      val +
      "&limit=" +
      limit,
    {
      headers: headers,
    }
  );
};
const getPaginatedAllClaims = (
  startDate,
  endDate,
  invoiceStart,
  invoiceEnd,
  pageNo,
  limit
) => {
  const headers = {
    "Content-Type": "application/json",
  };
  let query = ``;
  if (startDate && endDate) {
    query = `${API_URL}list-latest-claims?startDate=${startDate}&endDate=${endDate}&page=${pageNo}&limit=${limit}`;
  } else if (invoiceStart && invoiceEnd) {
    query = `${API_URL}list-latest-claims?invoiceStart=${invoiceStart}&invoiceEnd=${invoiceEnd}&page=${pageNo}&limit=${limit}`;
  }
  return axios.get(query, {
    headers: headers,
  });
};
const getPaginatedAllArchivedClaims = (
  year,
  startDate,
  endDate,
  startInvDate,
  endInvDate,
  pageNo,
  limit
) => {
  const headers = {
    "Content-Type": "application/json",
  };

  let query = ``;
  if (startDate && endDate) {
    query = `${API_URL}list-year-claims/${year}?startDate=${startDate}&endDate=${endDate}&page=${pageNo}&limit=${limit}`;
  } else if (startInvDate && endInvDate) {
    query = `${API_URL}list-year-claims/${year}?invoiceStart=${startInvDate}&invoiceEnd=${endInvDate}&page=${pageNo}&limit=${limit}`;
  } else {
    query = `${API_URL}list-year-claims/${year}?page=${pageNo}&limit=${limit}`;
  }

  return axios.get(query, {
    headers: headers,
  });
};

const getPaginatedAcceptedDateClaims = (startDate, endDate, pageNo, limit) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL +
      "list-accepted-claims" +
      "?startDate=" +
      startDate +
      "&endDate=" +
      endDate +
      "&page=" +
      pageNo +
      "&limit=" +
      limit,
    {
      headers: headers,
    }
  );
};

const getPaginatedInvAcceptedDateClaims = (
  startDate,
  endDate,
  pageNo,
  limit
) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL +
      "list-accepted-claims" +
      "?invoiceStart=" +
      startDate +
      "&invoiceEnd=" +
      endDate +
      "&page=" +
      pageNo +
      "&limit=" +
      limit,
    {
      headers: headers,
    }
  );
};

const getPaginatedRejectedDateClaims = (startDate, endDate, pageNo, limit) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL +
      "list-rejected-claims" +
      "?startDate=" +
      startDate +
      "&endDate=" +
      endDate +
      "&page=" +
      pageNo +
      "&limit=" +
      limit,
    {
      headers: headers,
    }
  );
};

const getPaginatedRejectedInvDateClaims = (
  startDate,
  endDate,
  pageNo,
  limit
) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL +
      "list-rejected-claims" +
      "?invoiceStart=" +
      startDate +
      "&invoiceEnd=" +
      endDate +
      "&page=" +
      pageNo +
      "&limit=" +
      limit,
    {
      headers: headers,
    }
  );
};

// final function
const getSearchWithDateAllClaims = (
  col,
  val,
  startDate,
  endDate,
  invoiceStart,
  invoiceEnd,
  limit,
  pageNo
) => {
  if (col === "1") {
    col = "username";
  } else if (col === "2") {
    col = "first_name";
  } else if (col === "3") {
    col = "last_name";
  } else if (col === "4") {
    col = "email";
  } else if (col === "5") {
    col = "employee";
  } else if (col === "6") {
    col = "invoice";
  } else if (col === "7") {
    col = "account";
  } else if (col === "8") {
    col = "store";
  } else if (col === "9") {
    col = "state";
  } else if (col === "10") {
    col = "city";
  } else if (col === "11") {
    col = "zip";
  } else if (col === "12") {
    col = "prodName";
  } else if (col === "13") {
    col = "prodCode";
  } else if (col === "14") {
    col = "splitStatus";
  } else if (col === "15") {
    col = "role";
  } else if (col === "16") {
    col = "quantity";
  } else if (col === "17") {
    col = "price";
  } else if (col === "18") {
    col = "totalPrice";
  } else {
    col = "";
  }

  const headers = {
    "Content-Type": "application/json",
  };

  console.log(col);
  let query = ``;
  if (col && val && startDate && endDate) {
    query = `${API_URL}list-latest-claims?col=${col}&val=${val}&startDate=${startDate}&endDate=${endDate}&limit=${limit}&page=${pageNo}`;
  } else if (col && val && invoiceStart && invoiceEnd) {
    query = `${API_URL}list-latest-claims?col=${col}&val=${val}&invoiceStart=${invoiceStart}&invoiceEnd=${invoiceEnd}&limit=${limit}&page=${pageNo}`;
  } else if (startDate && endDate) {
    query = `${API_URL}list-latest-claims?startDate=${startDate}&endDate=${endDate}&limit=${limit}&page=${pageNo}`;
  } else if (invoiceStart && invoiceEnd) {
    query = `${API_URL}list-latest-claims?invoiceStart=${invoiceStart}&invoiceEnd=${invoiceEnd}&limit=${limit}&page=${pageNo}`;
  }

  return axios.get(query, {
    headers: headers,
  });
};

const searchRejectedInvoiceDate = (startDate, endDate, limit) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL +
      "list-rejected-claims" +
      "?invoiceStart=" +
      startDate +
      "&invoiceEnd=" +
      endDate +
      "&limit=" +
      limit,
    {
      headers: headers,
    }
  );
};

const searchAcceptedInvoiceDate = (startDate, endDate, limit) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL +
      "list-accepted-claims" +
      "?invoiceStart=" +
      startDate +
      "&invoiceEnd=" +
      endDate +
      "&limit=" +
      limit,
    {
      headers: headers,
    }
  );
};

// FIXME name colliding
const getSearchWithDateAllArchivedClaims = (
  year,
  startDate,
  endDate,
  invoiceStart,
  invoiceEnd,
  limit,
  pageNo
) => {
  const headers = {
    "Content-Type": "application/json",
  };
  console.log("endpoint called");
  let query = ``;
  if (startDate && endDate) {
    query = `${API_URL}list-year-claims/${year}?startDate=${startDate}&endDate=${endDate}&page=${pageNo}&limit=${limit}`;
  } else if (invoiceStart && invoiceEnd) {
    query = `${API_URL}list-year-claims/${year}?invoiceStart=${invoiceStart}&invoiceEnd=${invoiceEnd}&page=${pageNo}&limit=${limit}`;
  }
  return axios.get(query, {
    headers: headers,
  });
};

const getSearchWithDatesAllArchivedClaims = (
  year,
  col,
  val,
  startDate,
  endDate,
  limit,
  pageNo
) => {
  if (col === "1") {
    col = "username";
  } else if (col === "2") {
    col = "first_name";
  } else if (col === "3") {
    col = "last_name";
  } else if (col === "4") {
    col = "email";
  } else if (col === "5") {
    col = "employee";
  } else if (col === "6") {
    col = "invoice";
  } else if (col === "7") {
    col = "invoice_date";
  } else if (col === "8") {
    col = "created_at";
  } else if (col === "9") {
    col = "account";
  } else if (col === "10") {
    col = "store";
  } else if (col === "11") {
    col = "state";
  } else if (col === "12") {
    col = "city";
  } else if (col === "13") {
    col = "zip";
  } else if (col === "14") {
    col = "product";
  } else if (col === "15") {
    col = "size";
  } else if (col === "16") {
    col = "status";
  } else if (col === "17") {
    col = "role";
  } else if (col === "18") {
    col = "quantity";
  } else if (col === "19") {
    col = "price";
  }
  const headers = {
    "Content-Type": "application/json",
  };

  let query = `${API_URL}list-year-claims/${year}?${col}=${val}&startDate=${startDate}&endDate=${endDate}&page=${pageNo}&limit=${limit}`;
  return axios.get(query, {
    headers: headers,
  });
};

// TODO date merge with search filter if it needs to be
const getSearchWithDateAccptedClaims = (
  col,
  val,
  startDate,
  endDate,
  limit,
  pageNo
) => {
  if (col === "1") {
    col = "username";
  } else if (col === "2") {
    col = "first_name";
  } else if (col === "3") {
    col = "last_name";
  } else if (col === "4") {
    col = "email";
  } else if (col === "5") {
    col = "employee";
  } else if (col === "6") {
    col = "invoice";
  } else if (col === "7") {
    col = "account";
  } else if (col === "8") {
    col = "store";
  } else if (col === "9") {
    col = "state";
  } else if (col === "10") {
    col = "city";
  } else if (col === "11") {
    col = "zip";
  } else if (col === "12") {
    col = "product";
  } else if (col === "13") {
    col = "prodCode";
  } else if (col === "14") {
    col = "splitStatus";
  } else if (col === "15") {
    col = "role";
  } else if (col === "16") {
    col = "quantity";
  } else if (col === "17") {
    col = "price";
  } else if (col === "18") {
    col = "totalPrice";
  } else {
    col = "";
  }
  const headers = {
    "Content-Type": "application/json",
  };
  let query = `${API_URL}list-accepted-claims?startDate=${startDate}&endDate=${endDate}&limit=${limit}&page=${pageNo}`;
  if (col && val) {
    query = `${API_URL}list-accepted-claims?col=${col}&val=${val}&startDate=${startDate}&endDate=${endDate}&limit=${limit}&page=${pageNo}`;
  }
  return axios.get(query, {
    headers: headers,
  });
};

const getSearchWithInvDateAccptedClaims = (
  col,
  val,
  startDate,
  endDate,
  limit,
  pageNo
) => {
  if (col === "1") {
    col = "username";
  } else if (col === "2") {
    col = "first_name";
  } else if (col === "3") {
    col = "last_name";
  } else if (col === "4") {
    col = "email";
  } else if (col === "5") {
    col = "employee";
  } else if (col === "6") {
    col = "invoice";
  } else if (col === "7") {
    col = "account";
  } else if (col === "8") {
    col = "store";
  } else if (col === "9") {
    col = "state";
  } else if (col === "10") {
    col = "city";
  } else if (col === "11") {
    col = "zip";
  } else if (col === "12") {
    col = "product";
  } else if (col === "13") {
    col = "prodCode";
  } else if (col === "14") {
    col = "splitStatus";
  } else if (col === "15") {
    col = "role";
  } else if (col === "16") {
    col = "quantity";
  } else if (col === "17") {
    col = "price";
  } else if (col === "18") {
    col = "totalPrice";
  } else {
    col = "";
  }
  const headers = {
    "Content-Type": "application/json",
  };
  let query = `${API_URL}list-accepted-claims?invoiceStart=${startDate}&invoiceEnd=${endDate}&limit=${limit}&page=${pageNo}`;
  if (col && val) {
    query = `${API_URL}list-accepted-claims?col=${col}&val=${val}&invoiceStart=${startDate}&invoiceEnd=${endDate}&limit=${limit}&page=${pageNo}`;
  }
  return axios.get(query, {
    headers: headers,
  });
};

const getSearchWithInvDateRejectedClaims = (
  col,
  val,
  startDate,
  endDate,
  limit,
  pageNo
) => {
  if (col === "1") {
    col = "username";
  } else if (col === "2") {
    col = "first_name";
  } else if (col === "3") {
    col = "last_name";
  } else if (col === "4") {
    col = "email";
  } else if (col === "5") {
    col = "employee";
  } else if (col === "6") {
    col = "invoice";
  } else if (col === "7") {
    col = "account";
  } else if (col === "8") {
    col = "store";
  } else if (col === "9") {
    col = "state";
  } else if (col === "10") {
    col = "city";
  } else if (col === "11") {
    col = "zip";
  } else if (col === "12") {
    col = "product";
  } else if (col === "13") {
    col = "prodCode";
  } else if (col === "14") {
    col = "splitStatus";
  } else if (col === "15") {
    col = "role";
  } else if (col === "16") {
    col = "quantity";
  } else if (col === "17") {
    col = "price";
  } else if (col === "18") {
    col = "totalPrice";
  } else {
    col = "";
  }
  const headers = {
    "Content-Type": "application/json",
  };
  let query = `${API_URL}list-rejected-claims?invoiceStart=${startDate}&invoiceEnd=${endDate}&limit=${limit}&page=${pageNo}`;
  if (col && val) {
    query = `${API_URL}user/claim/dashboard/list-rejected-claims?col=${col}&val=${val}&invoiceStart=${startDate}&invoiceEnd=${endDate}&limit=${limit}&page=${pageNo}`;
  }
  return axios.get(query, {
    headers: headers,
  });
};

const getSearchWithDateRejectedClaims = (
  col,
  val,
  startDate,
  endDate,
  limit,
  pageNo
) => {
  if (col === "1") {
    col = "username";
  } else if (col === "2") {
    col = "first_name";
  } else if (col === "3") {
    col = "last_name";
  } else if (col === "4") {
    col = "email";
  } else if (col === "5") {
    col = "employee";
  } else if (col === "6") {
    col = "invoice";
  } else if (col === "7") {
    col = "account";
  } else if (col === "8") {
    col = "store";
  } else if (col === "9") {
    col = "state";
  } else if (col === "10") {
    col = "city";
  } else if (col === "11") {
    col = "zip";
  } else if (col === "12") {
    col = "product";
  } else if (col === "13") {
    col = "prodCode";
  } else if (col === "14") {
    col = "splitStatus";
  } else if (col === "15") {
    col = "role";
  } else if (col === "16") {
    col = "quantity";
  } else if (col === "17") {
    col = "price";
  } else if (col === "18") {
    col = "totalPrice";
  } else {
    col = "";
  }
  const headers = {
    "Content-Type": "application/json",
  };
  let query = `${API_URL}list-rejected-claims?startDate=${startDate}&endDate=${endDate}&limit=${limit}&page=${pageNo}`;
  if (col && val) {
    query = `${API_URL}list-rejected-claims?col=${col}&val=${val}&startDate=${startDate}&endDate=${endDate}&limit=${limit}&page=${pageNo}`;
  }
  return axios.get(query, {
    headers: headers,
  });
};

const validateRegister = (values) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.post(
    API_URL + "register-user",
    {
      username: values.username,
      retailer_id: values.retailer,
      password: values.password,
      first_name: values.fname,
      last_name: values.lname,
      address1: values.address1,
      address2: values.address2,
      email: values.email,
      state_id: values.stateprov2,
      city_id: values.city2,
      zip: values.zipcode,
      signature: values.signature,
      ssn: values.ssn,
      phone: values.phone,
      fax: values.fax,
      register_from: "web",
      created_ip: secureLocalStorage.getItem("ip"),
    },
    {
      headers: headers,
    }
  );
};

const validateUser = (values) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "username-exist/" + values.username, {
    headers: headers,
  });
};
const validateEmail = (values) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "email-exist/" + values.email, {
    headers: headers,
  });
};

const validateSSN = (values) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "ssn-exist/" + values.ssn, {
    headers: headers,
  });
};
const validateSSNAdmin = (values) => {
  console.log("values=" + JSON.stringify(values));
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    `${API_URL}check-admin-ssn-exist/${values.id}/${values.ssn_number}`,
    {
      headers: headers,
    }
  );
};

const pendingClaims = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "count-pending-claims", {
    headers: headers,
  });
};

const pendingClaimsList = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "user-limited-latest-claims", {
    headers: headers,
  });
};

const latestClaimsList = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "list-latest-claims", {
    headers: headers,
  });
};

const acceptedClaimsList = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "list-accepted-claims", {
    headers: headers,
  });
};
const rejectedClaimsList = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "list-rejected-claims", {
    headers: headers,
  });
};

const totalClaims = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "count-claims", {
    headers: headers,
  });
};

const totalRsa = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "count-rsa", {
    headers: headers,
  });
};

const getPercentage = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(`${API_URL}get-percentage`, {
    headers: headers,
  });
};

const getSearchWithDateAllBalance = (type, sales, tina, startDate, endDate) => {
  const headers = {
    "Content-Type": "application/json",
  };
  let query = `${API_URL}user/1099/list-${type}-balance/${sales}/${tina}/${startDate}/${endDate}`;
  return axios.get(query, {
    headers: headers,
  });
};
const getSearchWithDateAllComparison = (sales, tina, startDate, endDate) => {
  const headers = {
    "Content-Type": "application/json",
  };
  let query = `${API_URL}user/1099/list-sale-comparison/${sales}/${tina}/${startDate}/${endDate}`;
  return axios.get(query, {
    headers: headers,
  });
};

const getOutstandingById = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "user/outstandings/" + id, {
    headers: headers,
  });
};

const UserService = {
  login,
  getProfile,

  getUserState,
  getCityByStateId,
  forgotPass,
  AdminforgotPass,
  changePass,
  checkToken,
  validateProfileEmail,
  contact,
  UpdateUserInfo,

  UpdateAdminInfo,
  UpdateAdminInfoWithPass,
  recentClaim,

  getPrevClaimstById,
  getLimitPrevClaimstById,
  getSearchPrevClaimstById,
  getPaginatedPrevClaimstById,
  getSearchWithDatePrevClaimstById,
  validateUser,
  validateRegister,
  validateEmail,
  validateSSN,
  validateSSNAdmin,

  getClaimDetail,
  checkClaimStatus,
  SubmitClaim,
  rejectClaimById,
  acceptClaimById,
  getProdPrice,
  pendingClaims,

  totalClaims,

  totalRsa,

  pendingClaimsList,

  latestClaimsList,

  acceptedClaimsList,
  rejectedClaimsList,

  getAllLatestClaims,
  getAllLatestClaimsStats,

  getAllArchivedClaims,

  getAllAcceptedClaims,
  getAllRejectedClaims,

  getPaginatedLatestClaims,
  getPaginatedAcceptedClaims,

  getPaginatedRejectedClaims,
  getSearchAllClaims,

  getSearchAllArchivedClaims,

  getSearchAllAcceptedClaims,
  getSearchAllRejectedClaims,

  getSearchWithDateAllClaims,

  getSearchWithDateAllBalance,
  getSearchWithDateAllComparison,
  getSearchWithDateAllArchivedClaims,

  getSearchWithDateAccptedClaims,
  getSearchWithInvDateAccptedClaims,
  getSearchWithDateRejectedClaims,
  getSearchWithInvDateRejectedClaims,

  rejectSelectedClaims,
  updateClaimPending,
  acceptSelectedClaims,
  getSearchWithoutDateAllClaims,
  getSearchWithoutDateAllArchivedClaims,

  getSearchWithoutDateAcceptedClaims,
  getSearchWithoutDateRejectedClaims,
  getPaginatedAllClaims,
  getPaginatedAllArchivedClaims,

  getPaginatedAcceptedDateClaims,
  getPaginatedInvAcceptedDateClaims,
  getPaginatedRejectedDateClaims,
  getPaginatedRejectedInvDateClaims,
  getAllYears,
  rejectAllClaims,
  acceptAllClaims,
  getPercentage,

  getSearchWithDatesAllArchivedClaims,

  searchRejectedInvoiceDate,
  searchAcceptedInvoiceDate,
  getOutstandingById,
};

export default UserService;
