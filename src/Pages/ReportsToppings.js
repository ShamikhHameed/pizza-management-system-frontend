import React, { useState, useEffect } from 'react'
import userService from '../Services/UserService';

function ReportsToppings() {
    const [content, setContent] = useState("");

    useEffect(() => {
        userService.getToppingsReports().then(
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
            <h1>{content}</h1>
        </div>
    )
}

export default ReportsToppings
