import {
  validateContact,
  validateEmptyData,
  validatePassword,
  validateLoanAmount,
  validateDropdown,
} from "./validators";
import { BRANCH_VALUES } from "../data/LoanApplicationForm";

export const validateLoginForm = (data) => {
  if (data.userID.trim().length === 0 || isNaN(parseFloat(data.userID))) {
    return {
      status: false,
      message: "Invalid User ID",
    };
  }

  if (data.password.trim().length === 0) {
    return {
      status: false,
      message: "Enter Password",
    };
  }

  return {
    status: true,
  };
};

export const validateRegistrationForm = (data) => {
  if (!validateEmptyData(data.firstName)) {
    return {
      status: false,
      message: "Invalid First Name",
    };
  }

  if (!validateEmptyData(data.middleName)) {
    return {
      status: false,
      message: "Invalid Middle Name",
    };
  }

  if (!validateEmptyData(data.lastName)) {
    return {
      status: false,
      message: "Invalid Last Name",
    };
  }

  if (!validateEmptyData(data.city)) {
    return {
      status: false,
      message: "Invalid City",
    };
  }

  if (!validateContact(data.contact)) {
    return {
      status: false,
      message: "Invalid Contact",
    };
  }

  if (!validateEmptyData(data.occupation)) {
    return {
      status: false,
      message: "Invalid Occupation",
    };
  }

  if (!validateEmptyData(data.dob)) {
    return {
      status: false,
      message: "Invalid Date of Birth",
    };
  }

  if (!validatePassword(data.password)) {
    return {
      status: false,
      message: "Invalid Password (Minimum 8 characters)",
    };
  }

  if (data.password.trim() !== data.cpassword.trim()) {
    return {
      status: false,
      message: "Passwords not matching",
    };
  }

  return {
    status: true,
  };
};

export const validateLoanInfo = (data) => {
  if (!validateLoanAmount(data.loanAmount) || isNaN(data.loanAmount)) {
    return {
      status: false,
      message: "Invalid Loan Amount",
    };
  }

  return {
    status: true,
  };
};

export const validateBranchName = (data, branchValues) => {
  if (!validateDropdown(data.branch, branchValues)) {
    return {
      status: false,
      message: "Invalid Branch Name",
    };
  }

  return {
    status: true,
  };
};
