import React, { useState } from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { apiRegister } from "../../api/api";
import Button from "../../components/Button/Button";
import FormField from "../../components/FormField/FormField";
import Heading from "../../components/Heading/Heading";
import { showErrorToastNotification } from "../../components/ToastNotification";
import { REGISTRATION_FORM } from "../../data/RegistrationForm";
import { validateRegistrationForm } from "../../validators/AuthValidator";
import styles from "./Registration.module.css";

const registrationCredentialsFormat = {
  firstName: "",
  middleName: "",
  lastName: "",
  city: "",
  contact: "",
  occupation: "",
  dob: "",
  password: "",
  cpassword: "",
};

function Registration() {
  let navigate = useNavigate();

  const [registrationData, setregistrationData] = useState(
    registrationCredentialsFormat
  );
  const [regSuccess, setregSuccess] = useState(false);
  const [userID, setuserID] = useState("123");

  const changeRegistrationData = (args) => {
    let prevState = registrationData;
    prevState[args.key] = args.value;
    setregistrationData({ ...prevState });
  };

  const clickedRegister = async () => {
    // Validation
    let validation = validateRegistrationForm(registrationData);

    if (!validation.status) {
      showErrorToastNotification(validation.message);
      return;
    }

    let resp = await apiRegister(registrationData);

    console.log(resp);

    if (resp === undefined) {
      showErrorToastNotification(<p>Please try again after sometime</p>);
    } else {
      if (resp.status === 200) {
        // Success
        setuserID(resp.data);
        setregSuccess(true);
      } else if (resp.status >= 400 && resp.status < 500) {
        showErrorToastNotification(<p>{resp.data}</p>);
      } else if (resp.status >= 500 && resp.status < 600) {
        showErrorToastNotification(<p>{resp.data}</p>);
      }
    }
  };

  return (
    <>
      {!regSuccess && (
        <Container className={`py-4`}>
          <Row>
            <Col>
              <Heading title={"Global Bank Branch Details Opening Page"} />
            </Col>
          </Row>

          <Row>
            <Stack gap={3} className={`align-items-center`}>
              {REGISTRATION_FORM.map((field, index) => {
                return (
                  <Col key={index} xs={12} md={8} lg={6}>
                    <FormField
                      type={field.type}
                      fieldName={field.fieldName}
                      name={field.name}
                      value={registrationData}
                      setter={changeRegistrationData}
                    />
                  </Col>
                );
              })}

              <Col xs={6}>
                <Button text={"Register"} onClickMethod={clickedRegister} />
              </Col>

              <Col xs={6}>
                <Button
                  text={"Already have an account? Login"}
                  onClickMethod={() => navigate("/login")}
                />
              </Col>
            </Stack>
          </Row>
        </Container>
      )}
      {regSuccess && (
        <Container className={`py-4`}>
          <Row>
            <Col>
              <Heading title={"Global Bank Branch Details Opening Page"} />
            </Col>
          </Row>

          <Row>
            <p>Your user ID is {userID}</p>
            <p>Please note this down and use it while logging in</p>
            <Col xs={15}>
              <Button text={"Login"} onClickMethod={() => navigate("/login")} />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default Registration;
