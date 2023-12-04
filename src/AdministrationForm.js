import React, { useState } from 'react';
import firebase from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import { TextField, Button, Typography, Container, Paper, Grid } from '@mui/material';

function AdministrationForm() {
    const [coffeeName, setCoffeeName] = useState('');
    const [price, setPrice] = useState('');

    const handleAddCoffee = async (e) => {
        e.preventDefault();

        await addDoc(collection(firebase.firestore(), "coffees"), {
            name: coffeeName,
            price: price
        });

        setCoffeeName('');
        setPrice('');
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper style={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 20 }}>
                <Typography component="h1" variant="h5">
                    Add New Coffee
                </Typography>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="coffeeName"
                        label="Coffee Name"
                        name="coffeeName"
                        autoFocus
                        value={coffeeName}
                        onChange={e => setCoffeeName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="price"
                        label="Base Price"
                        type="number"
                        id="price"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleAddCoffee}
                        style={{ marginTop: 3, marginBottom: 2 }}
                    >
                        Add Coffee
                    </Button>
                </Grid>
            </Paper>
        </Container>
    );
}

export default AdministrationForm;