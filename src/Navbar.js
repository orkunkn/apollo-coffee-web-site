import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { UserContext } from './UserContext';
import firebase from './firebase';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {

    const user = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await firebase.auth().signOut();
            navigate('/login');
        } catch (error) {
            console.error("Logout Error: ", error);
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        <Link style={{
                            textDecoration: "none",
                            boxShadow: "none",
                            color: "white"
                        }} to="/">Home</Link>
                    </Typography>
                    {!user && <Typography variant="h6" style={{ flexGrow: 1 }}>
                        <Link style={{
                            textDecoration: "none",
                            boxShadow: "none",
                            color: "white"
                        }} to="/signup">Register</Link>
                    </Typography>}
                    {!user && <Typography variant="h6" style={{ flexGrow: 1 }}>
                        <Link style={{
                            textDecoration: "none",
                            boxShadow: "none",
                            color: "white"
                        }} to="/login">Login</Link>
                    </Typography>}
                    {user && <Typography variant="h6" style={{ flexGrow: 1 }}>
                        <Link style={{
                            textDecoration: "none",
                            boxShadow: "none",
                            color: "white"
                        }} to="/order">Order</Link>
                    </Typography>}
                    {user && user.type === 'Worker' && (
                        <Typography variant="h6" style={{ flexGrow: 1 }}>
                            <Link style={{
                                textDecoration: "none",
                                boxShadow: "none",
                                color: "white"
                            }} to="/administration">Add New Coffee</Link>
                        </Typography>
                    )}
                    {user && (
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
