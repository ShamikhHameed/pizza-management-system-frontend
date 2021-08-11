import React, { useState, useEffect } from 'react'
import userService from '../Services/UserService';

function Users() {
    const [content, setContent] = useState("");

    useEffect(() => {
        userService.getAddUsers().then(
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
        <div className="Users">
            <h1>{content}</h1>
        </div>
    )
}

export default Users
