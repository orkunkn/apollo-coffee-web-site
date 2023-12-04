import React, { useState } from 'react';
import { TextField, Button, Alert, Container, Grid, Paper, InputLabel, Select, FormControl, MenuItem } from '@mui/material';
import firebase from './firebase';
import 'firebase/compat/firestore';

const SignupForm = () => {
  const [formData, setFormData] = useState({ name: '', surname: '', email: '', password: '', type: '' });
  const [message, setMessage] = useState('');


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (event) => {
    setFormData({ ...formData, type: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password);
      await addUserToDatabase(userCredential.user);
      await userCredential.user.sendEmailVerification();
      setMessage('Account created and sent an email successfully!');

    } catch (error) {
      setMessage(error.message);
    }
  };

  const addUserToDatabase = async (user) => {
    const userRef = firebase.firestore().collection('customers').doc(user.uid);
    await userRef.set({
      name: formData.name,
      surname: formData.surname,
      email: formData.email,
      type: formData.type
    });
  };

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: 20, marginTop: 50 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <TextField fullWidth label="Name" name="name" onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Surname" name="surname" onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Email" name="email" type="email" onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Password" name="password" type="password" onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={formData.type}
                label="Type"
                onChange={handleSelectChange}
                required
              >
                <MenuItem value="Customer">Customer</MenuItem>
                <MenuItem value="Worker">Worker</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth type="submit" variant="contained" color="primary" onClick={handleSubmit}>Sign Up</Button>
          </Grid>
          {message && <Grid item xs={12}><Alert severity="info">{message}</Alert></Grid>}
        </Grid>
      </Paper>
    </Container>
  );
};

export default SignupForm;
