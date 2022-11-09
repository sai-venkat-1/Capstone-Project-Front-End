import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row, Stack } from "react-bootstrap";
import Button from "../../components/Button/Button";
import FormField from "../../components/FormField/FormField";
import Heading from "../../components/Heading/Heading";
import { TRANSACTION_MANAGEMENT_FORM } from "../../data/TransactionManagementForm";
import { showErrorToastNotification } from "../../components/ToastNotification";
import { validateTransactionManagementForm } from "../../validators/TransactionManagementValidator";
import styles from "./TransactionManagement.module.css";

const transactionManagementDataFormat = {
  userID: "C12345",
  transactionType: "",
  loanAmount: "",
  balance: "2000",
};

function TransactionManagement() {
  const [transactionManagementData, settransactionManagementData] = useState(
    transactionManagementDataFormat
  );

  let navigate = useNavigate();

  const changeTransactionManagementData = (args) => {
    let prevState = transactionManagementData;
    prevState[args.key] = args.value;
    settransactionManagementData({ ...prevState });
  };

  const clickedTransactionManagement = () => {
    // Validation
    let validation = validateTransactionManagementForm(
      transactionManagementData
    );

    if (!validation.status) {
      console.log(validation.message);
      showErrorToastNotification(validation.message);
      return;
    }
    console.log(transactionManagementData);
  };

  return (
    <Container className={`py-4`}>
      <Row>
        <Col>
          <Heading title={"Global Bank Transaction Management Page"} />
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
              value={transactionManagementData}
              setter={changeTransactionManagementData}
              isReadOnly={true}
            />
          </Col>

          {TRANSACTION_MANAGEMENT_FORM.map((field, index) => {
            return (
              <Col key={index} xs={12} md={8} lg={6}>
                <FormField
                  type={field.type}
                  fieldName={field.fieldName}
                  name={field.name}
                  value={transactionManagementData}
                  setter={changeTransactionManagementData}
                  dropdownValues={
                    field.hasOwnProperty("dropdownValues") &&
                    field.dropdownValues
                  }
                />
              </Col>
            );
          })}

          <Col xs={6}>
            <Button
              text={"Apply"}
              onClickMethod={clickedTransactionManagement}
            />
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
  );
}

export default TransactionManagement;
