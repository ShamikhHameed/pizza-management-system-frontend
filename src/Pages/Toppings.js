import React, { useState, useEffect } from 'react'
import userService from '../Services/UserService';

function Toppings() {
    const [content, setContent] = useState("");

    useEffect(() => {
        userService.getAddTopping().then(
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
        <div className="Toppings">
            <h1>{content}</h1>
        </div>
    )
}

export default Toppings
