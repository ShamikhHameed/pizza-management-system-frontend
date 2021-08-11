import React, { useState, useEffect } from 'react'
import userService from '../Services/UserService';

function Crusts() {
    const [content, setContent] = useState("");

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
        <div className="Crusts">
            <h1>{content}</h1>
        </div>
    )
}

export default Crusts
