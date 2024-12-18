import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const API_URL = process.env.REACT_APP_API_Link;

const login = (values) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.post(
    API_URL + "login-admin",
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
    API_URL + "user/forgot-admin",
    {
      email: values.email,
    },
    {
      headers: headers,
    }
  );
};

const getSearchRsaStoreList = (limit, st_name, col, val, pageNo) => {
  if (col === "1") {
    col = "emp_number";
  } else if (col === "2") {
    col = "first_name";
  } else if (col === "3") {
    col = "last_name";
  } else if (col === "4") {
    col = "username";
  } else if (col === "5") {
    col = "email";
  } else if (col === "6") {
    col = "address";
  } else if (col === "7") {
    col = "state";
  } else if (col === "8") {
    col = "city";
  } else if (col === "9") {
    col = "zip";
  } else if (col === "11") {
    col = "retailer_name";
  }

  const headers = {
    "Content-Type": "application/json",
  };
  let query = `${API_URL}list-rsa?limit=${limit}&retailer=${st_name}&page=${pageNo}`;
  if (col && val) {
    query = `${API_URL}list-rsa?${col}=${val}&limit=${limit}&retailer=${st_name}&page=${pageNo}`;
  }
  return axios.get(query, {
    headers: headers,
  });
};

const getSearchRsaStoreListDeactivated = (limit, st_name, col, val, pageNo) => {
  if (col === "1") {
    col = "emp_number";
  } else if (col === "2") {
    col = "first_name";
  } else if (col === "3") {
    col = "last_name";
  } else if (col === "4") {
    col = "username";
  } else if (col === "5") {
    col = "email";
  } else if (col === "6") {
    col = "address";
  } else if (col === "7") {
    col = "state";
  } else if (col === "8") {
    col = "city";
  } else if (col === "9") {
    col = "zip";
  } else if (col === "11") {
    col = "retailer_name";
  }

  const headers = {
    "Content-Type": "application/json",
  };
  let query = `${API_URL}list-deactive-rsa?limit=${limit}&retailer=${st_name}&page=${pageNo}`;
  if (col && val) {
    query = `${API_URL}list-deactive-rsa?${col}=${val}&limit=${limit}&retailer=${st_name}&page=${pageNo}`;
  }
  return axios.get(query, {
    headers: headers,
  });
};

const addProduct = (values) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.post(
    API_URL + "add-product-kings",
    {
      description: values.productName,
      sku: values.sku,
      bonus: values.bonus,

      created_by: values.id,
      created_ip: secureLocalStorage.getItem("ip"),
    },
    {
      headers: headers,
    }
  );
};

const addRetailer = (values) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.post(
    API_URL + "add-retailer",
    {
      name: values.productName,

      created_by: values.id,
      created_ip: secureLocalStorage.getItem("ip"),
    },
    {
      headers: headers,
    }
  );
};

const getReportHistoryLimit = (limit) => {
  const headers = {
    "Content-Type": "application/json",
  };

  return axios.get(`${API_URL}list-report-history-clm?limit=${limit}`, {
    headers: headers,
  });
};

const getNewLimitProductList = (limit) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(`${API_URL}list-products-kings?limit=${limit}`, {
    headers: headers,
  });
};

const getSearchReportHistory = (col, val, limit, page) => {
  if (col === "1") {
    col = "title";
  } else if (col === "2") {
    col = "created_at";
  }

  const headers = {
    "Content-Type": "application/json",
  };

  return axios.get(
    `${API_URL}list-report-history-clm?${col}=${val}&limit=${limit}&page=${page}`,
    {
      headers: headers,
    }
  );
};
const getSearchProductList = (col, val, limit) => {
  if (col === "1") {
    col = "description";
  } else if (col === "2") {
    col = "sku";
  } else if (col === "3") {
    col = "bonus";
  }
  const headers = {
    "Content-Type": "application/json",
  };

  return axios.get(
    `${API_URL}list-products-kings?${col}=${val}&limit=${limit}`,
    {
      headers: headers,
    }
  );
};

const getPaginatedReportHistory = (pageNo, limit) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    `${API_URL}list-report-history-clm?page=${pageNo}&limit=${limit}`,
    {
      headers: headers,
    }
  );
};

const getPaginationProductList = (col, val, pageNo, limit) => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (col === "1") {
    col = "description";
  } else if (col === "2") {
    col = "sku";
  } else if (col === "3") {
    col = "bonus";
  }
  let query = `${API_URL}list-products-kings?page=${pageNo}&limit=${limit}`;

  if (col && val) {
    query = `${API_URL}list-products-kings?${col}=${val}&page=${pageNo}&limit=${limit}`;
  }
  return axios.get(query, {
    headers: headers,
  });
};

const getReportHistoryList = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "list-report-history-clm", {
    headers: headers,
  });
};

const getProductList = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "list-products-kings", {
    headers: headers,
  });
};

const getProductPriceBySizeId = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(`${API_URL}get-info-by-product-king/${id}`, {
    headers: headers,
  });
};

const updateProductList = (id, values) => {
  console.log(values);
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.put(
    `${API_URL}update-product-kings/${id}`,
    {
      bonus: values.price,
      updated_by: values.updated_by,
      updated_ip: secureLocalStorage.getItem("ip"),
    },
    {
      headers: headers,
    }
  );
};

const getRetailerList = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "list-retailers", {
    headers: headers,
  });
};
const getSearchRetailerList = (col, val, limit) => {
  if (col === "1") {
    col = "title";
  } else if (col === "2") {
    col = "size";
  } else if (col === "3") {
    col = "upc";
  } else if (col === "4") {
    col = "spiff";
  }
  const headers = {
    "Content-Type": "application/json",
  };

  return axios.get(`${API_URL}list-retailers?${col}=${val}&limit=${limit}`, {
    headers: headers,
  });
};

const getRetailerById = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(`${API_URL}get-retailer/${id}`, {
    headers: headers,
  });
};

const updateRetailer = (id, values) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.put(
    `${API_URL}update-retailer/${id}`,
    {
      name: values.productName,
      updated_by: values.updated_by,
      updated_ip: secureLocalStorage.getItem("ip"),
    },
    {
      headers: headers,
    }
  );
};

const getNewLimitRetailerLis = (limit) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(`${API_URL}list-retailers?limit=${limit}`, {
    headers: headers,
  });
};

const getPaginationRetailerLis = (col, val, pageNo, limit) => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (col == 1) {
    col = "title";
  } else if (col == 2) {
    col = "size";
  } else if (col == 3) {
    col = "code";
  } else if (col == 4) {
    col = "price";
  }
  let query = `${API_URL}list-retailers?page=${pageNo}&limit=${limit}`;

  if (col && val) {
    query = `${API_URL}list-retailers?${col}=${val}&page=${pageNo}&limit=${limit}`;
  }
  return axios.get(query, {
    headers: headers,
  });
};

const updateRsaList = (id, values) => {
  console.log(values);
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.put(
    `${API_URL}update-user-by-id-kings/${id}`,
    {
      ssn: values.ssn_number,
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      address1: values.address1,
      state: values.state,
      zip: values.zip,
      city: values.city,
      phone: values.phone,

      updated_by: values.updated_by,
      updated_ip: secureLocalStorage.getItem("ip"),
    },
    {
      headers: headers,
    }
  );
};

const getUserById = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "get-user-by-id/" + id, {
    headers: headers,
  });
};
const getRsaList = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "list-rsa", {
    headers: headers,
  });
};
const getRsaListDeactivated = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "list-deactive-rsa", {
    headers: headers,
  });
};

const getSearchRsaList = (col, val, store, limit, pageNo) => {
  if (col === "1") {
    col = "emp_number";
  } else if (col === "2") {
    col = "first_name";
  } else if (col === "3") {
    col = "last_name";
  } else if (col === "4") {
    col = "username";
  } else if (col === "5") {
    col = "email";
  } else if (col === "6") {
    col = "address";
  } else if (col === "7") {
    col = "state";
  } else if (col === "8") {
    col = "city";
  } else if (col === "9") {
    col = "zip";
  } else if (col === "10") {
    col = "created_at";
  } else if (col === "11") {
    col = "store";
  } else if (col === "12") {
    col = "store_address";
  } else if (col === "13") {
    col = "store_city";
  } else if (col === "14") {
    col = "store_zip";
  } else if (col === "15") {
    col = "store_account";
  }
  const headers = {
    "Content-Type": "application/json",
  };
  let query = ``;
  if (col && val && store) {
    query = `${API_URL}list-rsa?${col}=${val}&retailer=${store}&limit=${limit}&page=${pageNo}`;
  } else if (col && val) {
    query = `${API_URL}list-rsa?${col}=${val}&limit=${limit}&page=${pageNo}`;
  } else if (store) {
    query = `${API_URL}list-rsa?retailer=${store}&limit=${limit}&page=${pageNo}`;
  } else {
    query = `${API_URL}list-rsa?limit=${limit}&page=${pageNo}`;
  }
  return axios.get(query, {
    headers: headers,
  });
};

const getSearchRsaListDeactivated = (col, val, store, limit, pageNo) => {
  if (col === "1") {
    col = "emp_number";
  } else if (col === "2") {
    col = "first_name";
  } else if (col === "3") {
    col = "last_name";
  } else if (col === "4") {
    col = "username";
  } else if (col === "5") {
    col = "email";
  } else if (col === "6") {
    col = "address";
  } else if (col === "7") {
    col = "state";
  } else if (col === "8") {
    col = "city";
  } else if (col === "9") {
    col = "zip";
  } else if (col === "10") {
    col = "created_at";
  } else if (col === "11") {
    col = "store";
  } else if (col === "12") {
    col = "store_address";
  } else if (col === "13") {
    col = "store_city";
  } else if (col === "14") {
    col = "store_zip";
  } else if (col === "15") {
    col = "store_account";
  }
  const headers = {
    "Content-Type": "application/json",
  };
  let query = ``;
  if (col && val && store) {
    query = `${API_URL}list-deactive-rsa?${col}=${val}&retailer=${store}&limit=${limit}&page=${pageNo}`;
  } else if (col && val) {
    query = `${API_URL}list-deactive-rsa?${col}=${val}&limit=${limit}&page=${pageNo}`;
  } else if (store) {
    query = `${API_URL}list-deactive-rsa?retailer=${store}&limit=${limit}&page=${pageNo}`;
  } else {
    query = `${API_URL}list-deactive-rsa?limit=${limit}&page=${pageNo}`;
  }
  return axios.get(query, {
    headers: headers,
  });
};

const getSearchRsaByDate = (col, val, limit, pageNo) => {
  if (col === "1") {
    col = "first_name";
  } else if (col === "2") {
    col = "last_name";
  } else if (col === "3") {
    col = "username";
  } else if (col === "4") {
    col = "email";
  } else if (col === "5") {
    col = "store";
  } else if (col === "6") {
    col = "address";
  } else if (col === "7") {
    col = "zip";
  }
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL +
      "list-rsa?" +
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
const getSearchDeactivatedRsaByDate = (col, val, limit, pageNo) => {
  if (col === "1") {
    col = "first_name";
  } else if (col === "2") {
    col = "last_name";
  } else if (col === "3") {
    col = "username";
  } else if (col === "4") {
    col = "email";
  } else if (col === "5") {
    col = "store";
  } else if (col === "6") {
    col = "address";
  } else if (col === "7") {
    col = "zip";
  }
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL +
      "list-rsa?" +
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

const deleteParticipantsData = (recordId, adminId) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.delete(API_URL + "delete/" + recordId, {
    headers: headers,
    data: {
      deleted_by: adminId,
      deleted_ip: secureLocalStorage.getItem("ip"),
    },
  });
};
const deactiveParticipantsData = (admin, recordId) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.put(`${API_URL}deactivate/${admin}/${recordId}`, {
    headers: headers,
  });
};

const activeParticipantsData = (admin, recordId) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.put(`${API_URL}activate/${admin}/${recordId}`, {
    headers: headers,
  });
};

const deleteSelectedParticipants = (recordId, adminId) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.delete(API_URL + "delete-selected", {
    headers: headers,
    data: {
      deleted_by: adminId,
      user_id: recordId,
    },
  });
};

const deleteProduct = (recordId, adminId) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.delete(`${API_URL}delete-product-kings/${recordId}`, {
    headers: headers,
    data: {
      deleted_by: adminId,
      deleted_ip: secureLocalStorage.getItem("ip"),
    },
  });
};
const deleteRetailer = (recordId, adminId) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.delete(`${API_URL}delete-retailer/${recordId}`, {
    headers: headers,
    data: {
      deleted_by: adminId,
      deleted_ip: secureLocalStorage.getItem("ip"),
    },
  });
};

const getStoreNameSelectOptions = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "listRetailerName", {
    headers: headers,
  });
};

const getNewsletterList = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(`${API_URL}list-newsletter`, {
    headers: headers,
  });
};

const getNewsletterById = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(`${API_URL}get-newsletter-by-id/${id}`, {
    headers: headers,
  });
};

const updateNewsletterById = (id, body) => {
  const headers = {
    "Content-Type": "application/json",
  };
  // console.log(body);
  return axios.put(`${API_URL}update-newsletter/${id}`, body, {
    headers: headers,
  });
};

const getSearchNewsletterList = (col, val, limit) => {
  if (col === "1") {
    col = "title";
  } else if (col === "2") {
    col = "zip";
  }
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(`${API_URL}list-newsletter?${col}=${val}&limit=${limit}`, {
    headers: headers,
  });
};

const getPaginationNewsletterList = (pageNo, limit) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(`${API_URL}list-newsletter?page=${pageNo}&limit=${limit}`, {
    headers: headers,
  });
};

const getAllYears = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(`${API_URL}list-all-years`, {
    headers: headers,
  });
};

const addNewsletter = (values) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.post(
    API_URL + "add-newsletter",
    {
      subject: values.subject,
      body: values.body,
      created_by: values.id,
      created_ip: secureLocalStorage.getItem("ip"),
    },
    {
      headers: headers,
    }
  );
};
const deleteNewsletter = (recordId, adminId) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.delete(`${API_URL}delete-newsletter/${recordId}`, {
    headers: headers,
    data: {
      deleted_by: adminId,
      deleted_ip: secureLocalStorage.getItem("ip"),
    },
  });
};

const addUserState = (values) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.post(
    API_URL + "add-state",
    {
      name: values.stateName,
      code: values.code,
      created_by: values.id,
      created_ip: secureLocalStorage.getItem("ip"),
    },
    {
      headers: headers,
    }
  );
};
const getNewLimitUserStateList = (limit) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "list-state" + "?limit=" + limit, {
    headers: headers,
  });
};

const getSearchUserStateList = (col, val, limit) => {
  if (col === "1") {
    col = "id";
  } else if (col === "2") {
    col = "title";
  } else if (col === "3") {
    col = "code";
  }
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL + "list-state" + "?" + col + "=" + val + "&limit=" + limit,
    {
      headers: headers,
    }
  );
};

const getPaginationUserStateList = (pageNo, limit) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL + "list-state" + "?page=" + pageNo + "&limit=" + limit,
    {
      headers: headers,
    }
  );
};
const getUserStateList = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "list-state", {
    headers: headers,
  });
};
const getStateNameByIdUser = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "get-name-by-id/" + id, {
    headers: headers,
  });
};

const updateStateNameByIdUser = (id, values) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.put(
    API_URL + "update-state/" + id,
    {
      name: values.stateName,
      code: values.code,
      updated_by: values.updated_by,
      updated_ip: secureLocalStorage.getItem("ip"),
    },
    {
      headers: headers,
    }
  );
};

const deleteUserState = (recordId, adminId) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.delete(API_URL + "delete-state/" + recordId, {
    headers: headers,
    data: {
      deleted_by: adminId,
      deleted_ip: secureLocalStorage.getItem("ip"),
    },
  });
};

const addUserCity = (values) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.post(
    API_URL + "add-city",
    {
      city: values.cityName,
      zip: values.zipCode,
      state_id: values.stateName,
      created_by: values.id,
      created_ip: secureLocalStorage.getItem("ip"),
    },
    {
      headers: headers,
    }
  );
};

const getNewLimitCityListUser = (limit) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "list-city" + "?limit=" + limit, {
    headers: headers,
  });
};

const getSearchCityListUser = (col, val, limit) => {
  if (col === "1") {
    col = "title";
  } else if (col === "2") {
    col = "zip";
  }
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL + "list-city" + "?" + col + "=" + val + "&limit=" + limit,
    {
      headers: headers,
    }
  );
};
const getPaginationCityListUser = (pageNo, limit) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(
    API_URL + "list-city" + "?page=" + pageNo + "&limit=" + limit,
    {
      headers: headers,
    }
  );
};

const getCityListUser = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "list-city", {
    headers: headers,
  });
};

const deleteUserCity = (recordId, adminId) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.delete(API_URL + "delete-city/" + recordId, {
    headers: headers,
    data: {
      deleted_by: adminId,
      deleted_ip: secureLocalStorage.getItem("ip"),
    },
  });
};

const getCityInfoByIdUser = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "get-info-by-id/" + id, {
    headers: headers,
  });
};
const updateCityListUser = (id, values) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.put(
    API_URL + "update-city/" + id,
    {
      city: values.cityName,
      zip: values.zipCode,
      state_id: values.stateName,
      updated_by: values.updated_by,
      updated_ip: secureLocalStorage.getItem("ip"),
    },
    {
      headers: headers,
    }
  );
};
const AdminListService = {
  login,
  addUserState,
  getNewLimitUserStateList,
  getSearchUserStateList,
  getPaginationUserStateList,
  getUserStateList,
  getStateNameByIdUser,
  deleteUserState,
  updateStateNameByIdUser,
  addUserCity,
  updateCityListUser,
  getNewLimitCityListUser,
  getSearchCityListUser,
  getPaginationCityListUser,
  deleteUserCity,
  getCityListUser,
  getCityInfoByIdUser,
  forgotPass,

  getSearchRsaStoreList,
  getSearchRsaStoreListDeactivated,
  addProduct,

  addRetailer,

  getNewLimitProductList,

  getSearchReportHistory,
  getReportHistoryLimit,
  getPaginatedReportHistory,
  getReportHistoryList,
  getSearchProductList,

  getPaginationProductList,

  getProductList,

  updateProductList,

  getRetailerList,
  getSearchRetailerList,
  getNewLimitRetailerLis,
  getPaginationRetailerLis,
  updateRsaList,
  getRetailerById,
  updateRetailer,
  getRsaList,
  getRsaListDeactivated,

  getSearchRsaList,
  getSearchRsaListDeactivated,

  getSearchRsaByDate,
  getSearchDeactivatedRsaByDate,
  deleteParticipantsData,
  deactiveParticipantsData,
  activeParticipantsData,

  deleteSelectedParticipants,
  deleteProduct,
  deleteRetailer,
  getStoreNameSelectOptions,
  getUserById,
  getNewsletterList,

  getNewsletterById,
  updateNewsletterById,

  getSearchNewsletterList,

  getPaginationNewsletterList,

  getAllYears,

  getProductPriceBySizeId,
  addNewsletter,
  deleteNewsletter,
};

export default AdminListService;
