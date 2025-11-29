import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import type { ModalProps } from "react-bootstrap";

const Modal = ({ headerMessage, footerBtns }: ModalProps) => {
  return (
    <div className="modal fade" id="exampleModal" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Modal title
            </h1>
            <button type="button" className="btn-close"></button>
          </div>
          <div className="modal-footer"></div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
