import axios from "axios";

const url_login = "customer/loginCustomer";
const url_register = "customer/saveCustomer";
const url_loan = "customer/saveLoan";
const url_getAllBranches = "branch/all";

const api = axios.create({
  baseURL: "http://localhost:8080/",
});

export const apiLogin = async (data) => {
  try {
    const response = await api.post(`${url_login}`, data);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

export const apiRegister = async (data) => {
  try {
    const response = await api.post(`${url_register}`, data);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

export const apiLoan = async (data) => {
  console.log("payload", data);
  try {
    const response = await api.post(`${url_loan}`, data, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

export const apiGetAllBranches = async () => {
  try {
    const response = await api.get(`${url_getAllBranches}`);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};
