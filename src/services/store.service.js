import axios from "axios";

const API_URL = process.env.REACT_APP_API_Link;

const getRetailers = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "list-user-retailer", {
    headers: headers,
  });
};

const getRetailerInfoById = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "retailer-info-by-user/" + id, {
    headers: headers,
  });
};

const getCityByStateId = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "store/city/get-by-state-id/" + id, {
    headers: headers,
  });
};

const getStoreByCityId = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "store/get-by-city-id/" + id, {
    headers: headers,
  });
};

const getStoreInfoById = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "store/get-by-id/" + id, {
    headers: headers,
  });
};
const getUserState = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "list-all-states", {
    headers: headers,
  });
};
const StoreService = {
  getRetailers,
  getCityByStateId,
  getStoreByCityId,
  getStoreInfoById,
  getRetailerInfoById,
  getUserState,
};

export default StoreService;
