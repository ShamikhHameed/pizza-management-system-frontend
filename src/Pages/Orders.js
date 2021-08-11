import React, { useState, useEffect } from 'react'
import userService from '../Services/UserService';

function Orders() {
    const [content, setContent] = useState("");

    useEffect(() => {
        userService.getAddOrders().then(
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
        <div className="Orders">
            <h1>{content}</h1>
        </div>
    )
}

export default Orders
