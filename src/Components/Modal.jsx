import React, { Component, useRef, useEffect, useCallback, useState } from 'react'
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components'
import CloseIcon from '@material-ui/icons/Close';
import AuthService from '../Services/AuthService';

const Background = styled.div`
    /* width: 52%;
    height: 67%; */
    width: 200%;
    height: 200%;
    background: rgba(0,0,0,0.8);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ModalWrapper = styled.div`
    width: 800px;
    height: 500px;
    box-shadow: 0 5px 16px rgba(0,0,0,0.2);
    background: #fff;
    color: #000;
    display: grid;
    grid-template-columns: 1fr;
    position: relative;
    z-index: 99999;
    border-radius: 10px;
`

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1.8;
    color: #141414;

    p {
        margin-bottom: 1rem;
    }

    button {
        padding: 10px 24px;
        background: #141414;
        color: #fff;
        border: none;
    }
`


const CloseModalButton = styled(CloseIcon)`
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    padding: 0;
    z-index: 99999;
`


export const Modal = ({ showModal, setShowModal }) => {
    const modalRef = useRef()
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [message, setMessage] = useState("");

    const onChangeUsername = e => {
        setUsername(e.target.value);
    }

    const onChangeEmail = e => {
        setEmail(e.target.value);
    }

    const onChangePassword = e => {
        setPassword(e.target.value);
    }

    const onChangeRole = e => {
        setRole(e.target.value);
    }

    const animation = useSpring({
        config: {
            duration: 250
        },
        opacity: showModal ? 1 : 0,
        transform: showModal ? 'translateY(0%)' : 'translateY(-100%)'
    })

    const closeModal = e => {
        if(modalRef.current === e.target) {
            setShowModal(false);
        }
    }

    const keyPress = useCallback(
        e => {
            if(e.key === 'Escape' && showModal) {
                setShowModal(false);
            }
        },
        [setShowModal, showModal]
    );

    const addUser = e => {
        e.preventDefault();

        //this.form.validateAll();
        AuthService.register(username, email, role, password)
        .then(
            () => {
                console.log("User Added Successfully")
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                    
                setMessage(resMessage);
            }
        );        
    }

    useEffect(
        () => {
            document.addEventListener('keydown', keyPress);
            return () => document.removeEventListener('keydown', keyPress);
        }, [keyPress]
    )

    return (
        <>
        {showModal ? (
            <Background ref={modalRef} onClick={closeModal}>
                <animated.div style={animation}>
                <ModalWrapper showModal={showModal}>
                    <ModalContent>
                        <input 
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={onChangeUsername}
                        />
                        <input 
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={onChangeEmail}
                        />
                        <input 
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={onChangePassword}
                        />

                        <div
                            onClick={onChangeRole}
                        >
                            <label>Choose User Type</label>
                            <table>
                                <tr>
                                    <td>
                                        <input id="admin" type="radio" value="admin" name="userType"/>
                                    </td>
                                    <td>
                                        <label htmlFor="admin"> Admin</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input id="manager" type="radio" value="manager" name="userType"/>
                                    </td>
                                    <td>
                                        <label htmlFor="manager"> Manager</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input id="cashier" type="radio" value="cashier" name="userType"/>
                                    </td>
                                    <td>
                                        <label htmlFor="cashier"> Cashier</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input id="delivery" type="radio" value="delivery" name="userType"/>
                                    </td>
                                    <td>
                                        <label htmlFor="delivery"> Delivery</label>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <button onClick={addUser}>
                            Add User
                        </button>
                    </ModalContent>
                    <CloseModalButton onClick={() => setShowModal(prev => !prev)} />
                </ModalWrapper>
                </animated.div>
            </Background>
        ) : null}
        </>
    )
}