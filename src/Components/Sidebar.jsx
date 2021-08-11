import React, { useState } from 'react';
import { SidebarData } from './SidebarData'
import { Redirect } from 'react-router-dom';
import SubMenu from './SubMenu';
import authService from '../Services/AuthService';

function Sidebar({ authorized }) {
    const [subnav, setSubnav] = useState(false);
    const showSubnav = () => setSubnav(!subnav);
    const user = authService.getCurrentUser();
    const [userType, setUserType] = useState("");

    if (!authorized) {
        return <Redirect to="/login" />
    }

    const logOut = () => {
        authService.logout();
        window.location.reload();
    };

    return (
        <div className="App">
            <div className="Header">
                <div className="HeaderRight">
                    <p>
                        @{user.username}
                    </p>
                    <div>
                        {user.roles[0] === "ROLE_ADMIN" && <p>Admin</p>}
                        {user.roles[0] === "ROLE_MANAGER" && <p>Manager</p>}
                        {user.roles[0] === "ROLE_CASHIER" && <p>Cashier</p>}
                    </div>
                    <button 
                        onClick={logOut}
                    >
                        LOG OUT
                    </button>
                </div>
            </div>

            <div className="Sidebar">
                {SidebarData.map((val, index) => {
                    return val.role.map((roleVar, roleIndex) => (
                        <div key={roleIndex}>
                            {roleVar === user.roles[0] && <SubMenu val={val} key={index} /> }
                        </div>
                    ))
                })}
            </div>
        </div>
    )
}
 
export default Sidebar;