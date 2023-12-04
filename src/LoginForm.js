import React, { useState } from 'react';
import { TextField, Button, Alert, Container, Grid, Paper } from '@mui/material';
import firebase from './firebase';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(formData.email, formData.password);
      setMessage('Logged in successfully!');
      navigate('/apollo-coffee-web-site');
    } catch (error) {
      setMessage("Please check the email and password.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: 20, marginTop: 50 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <TextField fullWidth label="Email" name="email" type="email" onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Password" name="password" type="password" onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth type="submit" variant="contained" color="primary" onClick={handleSubmit}>Log In</Button>
          </Grid>
          {message && <Grid item xs={12}><Alert severity="info">{message}</Alert></Grid>}
        </Grid>
      </Paper>
    </Container>
  );
};

export default LoginForm;
