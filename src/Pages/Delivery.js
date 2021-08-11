import React, { useState, useEffect } from 'react'
import userService from '../Services/UserService';

function Delivery() {
    const [content, setContent] = useState("");

    useEffect(() => {
        userService.getAddDelivery().then(
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
        <div className="Delivery">
            <h1>{content}</h1>
        </div>
    )
}

export default Delivery
