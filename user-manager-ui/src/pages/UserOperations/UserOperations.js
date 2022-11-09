import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
import Button from "../../components/Button/Button";
import Heading from "../../components/Heading/Heading";
import { Auth, SetAuth } from "../../App";
import { showSuccessToastNotification } from "../../components/ToastNotification";

function UserOperations() {
  const auth = useContext(Auth);
  const setAuth = useContext(SetAuth);
  let navigate = useNavigate();

  useEffect(() => {

    

    return () => {};
  }, []);

  const logout = () => {
    setAuth(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    showSuccessToastNotification(<p>Logged out</p>);
  };

  return (
    <Container className={"py-4"}>
      <Row>
        <Col>
          <Heading title={"Global Bank User Operations"} />
        </Col>
      </Row>

      <Row>
        <Stack gap={4} classname={"align-items-center"}>
          <Col xs={15}>
            <Button
              text={"Apply for loan"}
              onClickMethod={() => navigate("/loan")}
            />
          </Col>

          <Col xs={15}>
            <Button
              text={"Transactions"}
              onClickMethod={() => navigate("/transaction")}
            />
          </Col>

          <Col xs={15}>
            <Button
              text={"View Statement"}
              onClickMethod={() => navigate("/statement")}
            />
          </Col>

          <Col xs={15}>
            <Button text={"Logout"} onClickMethod={logout} />
          </Col>
        </Stack>
      </Row>
    </Container>
  );
}

export default UserOperations;
