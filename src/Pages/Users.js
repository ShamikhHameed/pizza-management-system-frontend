import React, { useState, useEffect } from 'react'
import { AddUserModal } from '../Modals/AddUserModal';
import { ConfirmDeleteModal } from '../Modals/ConfirmDeleteModal'
import { UpdateUserModal } from '../Modals/UpdateUserModal'
import userService from '../Services/UserService';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Avatar, Grid, TableFooter, TablePagination, Typography } from '@material-ui/core';
import UserService from '../Services/UserService';
import FlashMessage from '../Components/FlashMessage';

const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    TableContainer: {
        borderRadius: 15
    },
    TableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: '#0676ED',
        color: 'white',
        paddingLeft: '60px'
    },
    Avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    Username: {
        paddingTop: '8px'
    }
  }));

function Users() {
    const [content, setContent] = useState("");
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [snackbarSuccess, setSnackbarSuccess] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarType, setSnackbarType] = useState("");
    const [deleteUserId, setdeleteUserId] = useState("");
    // const [updateUserId, setupdateUserId] = useState("");
    const [userDetails, setUserDetails] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const openAddUserModal = () => {
        setShowAddUserModal(prev => !prev)
    }

    const openConfirmDeleteModal = () => {
        setShowConfirmDeleteModal(prev => !prev)
    }

    const openUpdateUserModal = () => {
        setShowUpdateUserModal(prev => !prev)
    }

    const handleDelete = id => {
        setdeleteUserId(id);
        openConfirmDeleteModal();
    }

    const handleUpdate = async userDetails => {
        // setupdateUserId(id);
        await setUserDetails(userDetails)
        await openUpdateUserModal();
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    // const deleteUser = id => {
    //     UserService.deleteUser(id).then(
    //         () => {
    //             setSnackbarMessage("User deleted Successfully");
    //             setSnackbarType("success");
    //             setSnackbarSuccess(true);
    //         },
    //         error => {
    //             const resMessage =
    //             (error.response &&
    //                 error.response.data &&
    //                 error.response.data.message) ||
    //             error.message ||
    //             error.toString();
    //         setSnackbarMessage("ERROR: Unable to delete user. " + resMessage);
    //         setSnackbarType("error");
    //         setSnackbarSuccess(true);
    //         // setMessage(resMessage);
    //         }
    //     )
    // }

    useEffect(() => {
        userService.getUsersList().then(
            response => {
                setUsers(Object.values(response.data));
            },
            error => {
                console.log(
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString())
            }
        );
    })

    const classes = useStyles();

    return (
        <div className="BodyWindow">
            <div className="BodyWindowTop">
                <div className="BodyWindowTopLeft">
                    <button onClick={openAddUserModal}>
                        Add User
                    </button>
                </div>
            </div>
            <div className="BodyWindowBottom">
                <TableContainer component={Paper} className={classes.TableContainer}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.TableHeaderCell}>Username</TableCell>
                                <TableCell className={classes.TableHeaderCell}>Email</TableCell>
                                <TableCell className={classes.TableHeaderCell} style={{ paddingLeft:'30px' }}>
                                    Role
                                </TableCell>
                                <TableCell className={classes.TableHeaderCell}/>
                                <TableCell className={classes.TableHeaderCell}/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Grid container>
                                        <Grid item lg={2}>
                                            <Avatar alt={user.username} src='.' className={classes.Avatar} />
                                        </Grid>
                                        <Grid item lg={1}/>
                                        <Grid item lg={9}>
                                            <Typography className={classes.Username}> {user.username}</Typography>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                {user.roles.map((role, roleIndex) => (
                                    <TableCell>
                                        {role.name === "ROLE_ADMIN" && <span>ADMIN</span>}
                                        {role.name === "ROLE_MANAGER" && <span>MANAGER</span>}
                                        {role.name === "ROLE_CASHIER" && <span>CASHIER</span>}
                                        {role.name === "ROLE_DELIVERY" && <span>DELIVERY</span>}
                                    </TableCell> 
                                ))}
                                <TableCell>
                                    <button className="form-update" onClick={() => handleUpdate(user)}>
                                        UPDATE
                                    </button>
                                </TableCell>
                                <TableCell>
                                    <button className="form-delete" onClick={() => handleDelete(user.id)}>
                                        DELETE
                                    </button>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                        <TablePagination
                            rowsPerPageOptions={[4, 6, 8]}
                            component="div"
                            count={users.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableFooter>
                    </Table>
                </TableContainer>
            </div>
            <AddUserModal showModal={showAddUserModal} setShowModal={setShowAddUserModal} />
            <UpdateUserModal showModal={showUpdateUserModal} setShowModal={setShowUpdateUserModal} userDetails={userDetails} />
            <ConfirmDeleteModal showModal={showConfirmDeleteModal} setShowModal={setShowConfirmDeleteModal} id={deleteUserId} />
            {
            snackbarSuccess ? <FlashMessage message={snackbarMessage} type={snackbarType} /> : ""
            }
        </div>
    )
}

export default Users
