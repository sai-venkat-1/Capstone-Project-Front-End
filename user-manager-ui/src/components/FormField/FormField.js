import React from "react";
import styles from "./FormField.module.css";
import { Col, Form, Stack } from "react-bootstrap";

function FormField({
  type,
  fieldName,
  name,
  value,
  setter,
  isReadOnly = false,
  dropdownValues = [],
}) {
  const renderFormField = () => {
    if (["text", "password", "date", "number"].includes(type)) {
      return (
        <>
          <Form.Group className="mb-8">
            <Stack direction="horizontal" className={`justify-content-center`}>
              <Col xs={4}>
                <Form.Label>{fieldName}</Form.Label>
              </Col>
              <Col xs={6}>
                <Form.Control
                  type={type}
                  value={value[name]}
                  onChange={(e) =>
                    setter({
                      key: name,
                      value: e.target.value,
                    })
                  }
                  readOnly={isReadOnly && "readonly"}
                />
              </Col>
            </Stack>
          </Form.Group>
        </>
      );
    } else if (["dropdown"].includes(type)) {
      return (
        <>
          <Form.Group className="mb-8">
            <Stack direction="horizontal" className={`justify-content-center`}>
              <Col xs={4}>
                <Form.Label>{fieldName}</Form.Label>
              </Col>
              <Col xs={6}>
                <Form.Select
                  value={value[name]}
                  onChange={(e) =>
                    setter({
                      key: name,
                      value: e.target.value,
                    })
                  }
                >
                  <option value="" disabled={true}>
                    Select from dropdown
                  </option>
                  {dropdownValues.map((dropdownValue, index) => {
                    return (
                      <option key={index} value={dropdownValue.id}>
                        {dropdownValue.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Col>
            </Stack>
          </Form.Group>
        </>
      );
    }
  };
  return <>{renderFormField()}</>;
}

export default FormField;
