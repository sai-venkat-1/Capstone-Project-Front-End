import React, { useEffect, useState } from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { apiGetAllBranches, apiLoan } from "../../api/api";
import Button from "../../components/Button/Button";
import FormField from "../../components/FormField/FormField";
import Heading from "../../components/Heading/Heading";
import {
  showErrorToastNotification,
  showSuccessToastNotification,
} from "../../components/ToastNotification";
import { LOAN_APPLICATION_FORM } from "../../data/LoanApplicationForm";
import {
  validateLoanInfo,
  validateBranchName,
} from "../../validators/AuthValidator";
import styles from "./LoanApplication.module.css";

const loanInfoFormat = {
  userID: "",
  branch: "",
  loanAmount: "",
};

function LoanApplication() {
  let navigate = useNavigate();

  const [loanInfo, setloanInfo] = useState(loanInfoFormat);
  const [branches, setbranches] = useState([]);
  const [loanSuccess, setloanSuccess] = useState(false);
  const [loanSuccessData, setloanSuccessData] = useState("");

  useEffect(() => {
    console.log(localStorage.getItem("userID"));
    changeLoanInfo({ key: "userID", value: localStorage.getItem("userID") });

    getBranchesList();
    return () => {};
  }, []);

  const getBranchesList = async () => {
    let resp = await apiGetAllBranches();
    setbranches(resp.data);
  };

  const changeLoanInfo = (args) => {
    let prevState = loanInfo;
    prevState[args.key] = args.value;
    setloanInfo({ ...prevState });
  };

  const clickedSubmit = async () => {
    // Validation
    let dropdownvalidation = validateBranchName(loanInfo, branches);

    if (!dropdownvalidation.status) {
      showErrorToastNotification(dropdownvalidation.message);
      return;
    }

    let validation = validateLoanInfo(loanInfo);

    if (!validation.status) {
      showErrorToastNotification(validation.message);
      return;
    }

    let selectedBranch = {};
    for (let i = 0; i < branches.length; i++) {
      if (loanInfo.branch === branches[i].id.toString()) {
        selectedBranch = branches[i];
        break;
      }
    }
    let resp = await apiLoan({ ...loanInfo, branch: selectedBranch });

    console.log(resp);

    if (resp === undefined) {
      showErrorToastNotification(<p>Please try again after sometime</p>);
    } else {
      if (resp.status === 200) {
        // Success
        setloanSuccess(true);
        setloanSuccessData(resp.data);
      } else if (resp.status >= 400 && resp.status < 500) {
        showErrorToastNotification(<p>{resp.data}</p>);
      } else if (resp.status >= 500 && resp.status < 600) {
        showErrorToastNotification(<p>{resp.data}</p>);
      }
    }

    console.log(loanInfo);
  };

  return (
    <>
      {!loanSuccess && (
        <Container className={`py-4`}>
          <Row>
            <Col>
              <Heading title={"Global Bank User Loan Application Page"} />
            </Col>
          </Row>

          <Row>
            <Stack gap={3} className={`align-items-center`}>
              {/* User ID */}
              <Col xs={12} md={8} lg={6}>
                <FormField
                  type={"text"}
                  fieldName={"User ID"}
                  placeholder={"User ID"}
                  name={"userID"}
                  value={loanInfo}
                  setter={changeLoanInfo}
                  isReadOnly={true}
                />
              </Col>

              {LOAN_APPLICATION_FORM.map((field, index) => {
                return (
                  <Col key={index} xs={12} md={8} lg={6}>
                    <FormField
                      type={field.type}
                      fieldName={field.fieldName}
                      name={field.name}
                      value={loanInfo}
                      setter={changeLoanInfo}
                      dropdownValues={
                        field.hasOwnProperty("dropdownValues") && branches
                      }
                    />
                  </Col>
                );
              })}

              <Col xs={6}>
                <Button text={"Submit"} onClickMethod={clickedSubmit} />
              </Col>

              <Col xs={6}>
                <Button
                  text={"Back to Operations"}
                  onClickMethod={() => navigate("/operations")}
                />
              </Col>
            </Stack>
          </Row>
        </Container>
      )}
      {loanSuccess && (
        <Container className={`py-4`}>
          <Row>
            <Col>
              <Heading title={"Global Bank Branch Details Opening Page"} />
            </Col>
          </Row>

          <Row>
            <p>{loanSuccessData}</p>

            <Col xs={15}>
              <Button
                text={"Go to user operations"}
                onClickMethod={() => navigate("/operations")}
              />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default LoanApplication;
