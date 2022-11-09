import React, { useContext, useState } from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { apiLogin } from "../../api/api";
import { Auth, SetAuth } from "../../App";
import Button from "../../components/Button/Button";
import FormField from "../../components/FormField/FormField";
import Heading from "../../components/Heading/Heading";
import { showErrorToastNotification } from "../../components/ToastNotification";
import { LOGIN_FORM } from "../../data/LoginForm";
import { validateLoginForm } from "../../validators/AuthValidator";
import styles from "./Login.module.css";

const loginCredentialsFormat = {
  userID: "",
  password: "",
};

function Login() {
  let navigate = useNavigate();
  const auth = useContext(Auth);
  const setAuth = useContext(SetAuth);

  const [loginCredentials, setloginCredentials] = useState(
    loginCredentialsFormat
  );

  const changeLoginCredentials = (args) => {
    let prevState = loginCredentials;
    prevState[args.key] = args.value;
    setloginCredentials({ ...prevState });
  };

  const clickedLogin = async () => {
    // Validation
    let validation = validateLoginForm(loginCredentials);

    if (!validation.status) {
      showErrorToastNotification(validation.message);
      return;
    }

    let resp = await apiLogin({
      userID: Number(loginCredentials.userID),
      password: loginCredentials.password,
    });

    console.log(resp);

    if (resp === undefined) {
      showErrorToastNotification(<p>Please try again after sometime</p>);
    } else {
      if (resp.status === 200) {
        // Success
        setAuth(true);
        let respData = resp.data.split(";;;");
        localStorage.setItem("userID", respData[0]);
        localStorage.setItem("token", respData[1]);
        navigate("/operations");
      } else if (resp.status >= 400 && resp.status < 500) {
        showErrorToastNotification(<p>{resp.data}</p>);
      } else if (resp.status >= 500 && resp.status < 600) {
        showErrorToastNotification(<p>{resp.data}</p>);
      }
    }
  };

  return (
    <Container className={`py-4`}>
      <Row>
        <Col>
          <Heading title={"Global Bank User Login"} />
        </Col>
      </Row>

      <Row>
        <Stack gap={3} className={`align-items-center`}>
          {LOGIN_FORM.map((field, index) => {
            return (
              <Col key={index} xs={12} md={8} lg={6}>
                <FormField
                  type={field.type}
                  fieldName={field.fieldName}
                  name={field.name}
                  value={loginCredentials}
                  setter={changeLoginCredentials}
                />
              </Col>
            );
          })}

          <Col xs={6}>
            <Button text={"Login"} onClickMethod={clickedLogin} />
          </Col>

          <Col xs={6}>
            <Button
              text={"Don't have an account? Register"}
              onClickMethod={() => navigate("/register")}
            />
          </Col>
        </Stack>
      </Row>
    </Container>
  );
}

export default Login;
