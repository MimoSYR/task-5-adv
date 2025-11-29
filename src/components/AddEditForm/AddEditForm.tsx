import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import type { AddEditFormProps } from "../../types/interfaces";
import { useRef, type ChangeEvent, type FormEvent } from "react";
import { Image } from "react-bootstrap";

const AddEditForm = ({ inputs, dataHandle }: AddEditFormProps) => {
  let data = inputs[0].value
    ? {
        [inputs[0].keyName]: inputs[0].value,
        [inputs[1].keyName]: inputs[1].value,
      }
    : {};
  let imgPreviwSrc = "/uploadIcon.png";

  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files, type } = event.target;
    console.log(name, value, type);

    if (type === "file" && files && files.length > 0) {
      const file = files[0];
      data = { ...data, [name]: file };
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          imgPreviwSrc = reader.result;
        }
      };
      reader.readAsDataURL(file);
    } else {
      data = { ...data, [name]: value };
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dataHandle(data);
    console.log(data);
  };

  const imgInputConfig = inputs.find((input) => input.type === "File");
  const otherInputs = inputs.filter((input) => input.type !== "File");

  return (
    <Form onSubmit={(event) => onSubmit(event)}>
      <Row>
        <Col className="d-flex flex-column justify-content-between">
          {/* Item Name Input */}
          {otherInputs.map((input) => (
            <Form.Group key={input.keyName}>
              <Form.Label>{input.label}</Form.Label>
              <Form.Control
                className="fs-6 py-3"
                name={input.keyName}
                type={input.type}
                placeholder={input.placeholder}
                defaultValue={input.value || ""}
                onChange={(event) => onChange(event)}
                required
              />
            </Form.Group>
          ))}
        </Col>
        {/* Item Image Input */}
        <Col>
          {imgInputConfig && (
            <Form.Group className="d-flex flex-column h-100">
              <Form.Label>{imgInputConfig.label}</Form.Label>
              <Form.Control
                name={imgInputConfig.keyName}
                className="d-none"
                type={imgInputConfig.type}
                onChange={(event) => onChange(event)}
                ref={fileInputRef}
              />
              <div
                onClick={() => triggerFileInputClick()}
                className="w-100 text-center flex-fill image-input rounded-1 cursor-pointer d-flex align-items-center justify-content-center">
                <Image
                  className={`img-208`}
                  src={imgInputConfig.value || imgPreviwSrc}
                />
              </div>
            </Form.Group>
          )}
        </Col>
      </Row>
      <Row>
        <div className="text-center mt-5">
          <Button
            size="lg"
            className="text-white px-5 rounded-1 fw-medium"
            variant="warning"
            type="submit">
            Save
          </Button>
        </div>
      </Row>
    </Form>
  );
};

export default AddEditForm;
