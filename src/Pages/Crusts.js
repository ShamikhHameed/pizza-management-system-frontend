import React, { useState, useEffect } from 'react'
import { Modal } from '../Components/Modal';
import userService from '../Services/UserService';

function Crusts() {
    const [content, setContent] = useState("");
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(prev => !prev)
    }

    useEffect(() => {
        userService.getAddCrusts().then(
            response => {
                setContent(response.data);
            },
            error => {
                setContent(
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString())
            }
        );
    })

    return (
        <div className="BodyWindow">
            <div className="BodyWindowTop">
                <div className="BodyWindowTopLeft">
                    <button onClick={openModal}>
                        Add User
                    </button>
                </div>
            </div>
            <div className="BodyWindowBottom">
                Bottom part
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal} />
            {/* <h1>{content}</h1> */}
        </div>
    )
}

export default Crusts
