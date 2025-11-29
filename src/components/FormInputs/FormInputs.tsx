import { useRef, type ChangeEvent, type FormEvent } from "react";
import type { FormProps } from "../../types/interfaces";
import { Button, Col, Form, Image, Row } from "react-bootstrap";

const FormInputs = ({ inputs, formBtn, dataHandle }: FormProps<T>) => {
  let data = {};

  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const sendData = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dataHandle(data);
  };

  return (
    <Form onSubmit={(event) => sendData(event)}>
      <Row>
        {inputs.map((input) =>
          input.keyName === "first_name" || input.keyName === "last_name" ? (
            // //////////////////////////
            // First Name & Last Name Row
            <Col key={input.keyName} className="text-start mb-4 w-45">
              <Form.Group>
                <Form.Label className="text-capitalize fw-medium text-gray">
                  {input.label}
                </Form.Label>
                <Form.Control
                  className="rounded-1 fs-14 py-2"
                  name={input.keyName}
                  type={input.type}
                  placeholder={`${input.placeholder && input.placeholder}`}
                  required={input.type !== "File"}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    data = {
                      ...data,
                      [input.keyName]:
                        input.type == "File"
                          ? event.target.files?.[0]
                          : event.target.value,
                    };
                  }}
                />
              </Form.Group>
            </Col>
          ) : (
            <div key={input.keyName} className="text-start mb-4">
              {input.keyName === "profile_image" ||
              input.keyName === "image" ? (
                // /////////////////
                // Profile Image Row
                <Form.Group>
                  <Form.Label className="text-capitalize fw-medium text-gray">
                    {input.label}
                  </Form.Label>
                  <Form.Control
                    ref={fileInputRef}
                    className="d-none"
                    name={input.keyName}
                    type={input.type}
                    placeholder={`${input.placeholder && input.placeholder}`}
                    required={input.type !== "File"}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      data = {
                        ...data,
                        [input.keyName]:
                          input.type == "File"
                            ? event.target.files?.[0]
                            : event.target.value,
                      };
                    }}
                  />
                  <div
                    onClick={() => triggerFileInputClick()}
                    className="upload-image text-center flex-fill image-input rounded-1 cursor-pointer d-flex align-items-center justify-content-center">
                    <Image src="/uploadIcon.png" />
                  </div>
                </Form.Group>
              ) : (
                // ///////////////////
                // Regulel Inputs Rows
                <Form.Group>
                  <Form.Label className="text-capitalize fw-medium text-gray">
                    {input.label}
                  </Form.Label>
                  <Form.Control
                    className="w-100 rounded-1 py-2 fs-14"
                    name={input.keyName}
                    type={input.type}
                    placeholder={`${input.placeholder && input.placeholder}`}
                    required={input.type !== "File"}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      data = {
                        ...data,
                        [input.keyName]:
                          input.type == "File"
                            ? event.target.files?.[0]
                            : event.target.value,
                      };
                    }}
                  />
                </Form.Group>
              )}
            </div>
          )
        )}
      </Row>
      <Button
        variant="warning"
        className="text-white w-100 mb-4 mt-2 py-2 text-uppercase"
        type="submit">
        {formBtn}
      </Button>
    </Form>
  );
};

export default FormInputs;
