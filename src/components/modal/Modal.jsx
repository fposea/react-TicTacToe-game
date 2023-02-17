import React from "react";
import "./Modal.css";

const Modal = (props) => {
  
  return (
    <div className={`${props.isOpen ? "modal-wrapper" : "modal-hidden"}`}>
      <div className="modal-content">
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
