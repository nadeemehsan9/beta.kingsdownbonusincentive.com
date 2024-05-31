import axios from "axios";

const API_URL = process.env.REACT_APP_API_Link;

const getProductList = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "user/product/list", {
    headers: headers,
  });
};

const getProductForSize = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "list-product", {
    headers: headers,
  });
};

const getProduct = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "product-kingsdown", {
    headers: headers,
  });
};

const getSizeByUserProduct = (userId, prodId) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(`${API_URL}list-size-by-product-clm/${prodId}`, {
    headers: headers,
  });
};

const ProductService = {
  getProduct,

  getSizeByUserProduct,
  getProductList,
  getProductForSize,
};

export default ProductService;
