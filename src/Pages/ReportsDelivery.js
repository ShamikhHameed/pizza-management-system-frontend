import React, { useState, useEffect } from 'react'
import userService from '../Services/UserService';

function ReportsDelivery() {
    const [content, setContent] = useState("");

    useEffect(() => {
        userService.getDeliveryReports().then(
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
        <div className="ReportsDelivery">
            <h1>{content}</h1>
        </div>
    )
}

export default ReportsDelivery
