import { toast } from "react-toastify";

export const showErrorToastNotification = (message) => {
  toast.error(message || "Server Error", {
    className: "toastWrapper",
    bodyClassName: "toastBody",
    progressClassName: "toastProgress",
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    theme: "dark",
    pauseOnHover: true,
  });
};

export const showSuccessToastNotification = (message) => {
  toast.success(message || "Success", {
    className: "toastWrapper",
    bodyClassName: "toastBody",
    progressClassName: "toastProgress",
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    theme: "dark",
    pauseOnHover: true,
  });
};

export const showWarnToastNotification = (message) => {
  toast.warn(message || "Warning", {
    className: "toastWrapper",
    bodyClassName: "toastBody",
    progressClassName: "toastProgress",
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    theme: "dark",
    pauseOnHover: true,
  });
};
