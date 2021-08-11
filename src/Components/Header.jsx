import React, { Component } from 'react';
import styled from 'styled-components'
import authService from '../Services/authService';

function Header() {
    const user = authService.getCurrentUser();
    console.log(user);

    return (
        <div className="Header">
            <div className="HeaderRight">
            </div>
        </div>
    )
}

export default Header;