import React, {useState} from "react";
import { MdOutlineCancel } from "react-icons/md";
import "../styles/Modal.css";

export default function DeleteModal(props) {
  let currentSelect = props.currentSelect
  let showModal = props.showModal

  const closeModal = () => {
    props.handleShowModal("none")
  }

  return (
    <>
        <div className="modal" style={{display: showModal}}>
        {/* <div className="modal" style={modalOn ? {display:"block"}: {display: "none"}}> */}
            <div className="modal-content">
            <MdOutlineCancel 
                        className="close"
                        onClick={closeModal}
                        size={22}
                    />
                <h2> Are you sure you want to delete <span className="modal-list-title">{currentSelect}</span>?</h2>
                <button
                    className="modal-btn "
                    onClick={() => props.handleDeleteSelect()}
                >
                    Delete
                </button>

            </div>
        </div>
    </>
  );
}
