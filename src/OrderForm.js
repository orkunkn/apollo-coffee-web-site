import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Grid, TextField, Button, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import firebase from './firebase';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const OrderForm = () => {
    const user = useContext(UserContext);
    const userId = user ? user._delegate.uid : null;
    const [coffees, setCoffees] = useState([]);
    const [order, setOrder] = useState({});
    const [deliveryTime, setDeliveryTime] = useState('now');
    const navigate = useNavigate();

    useEffect(() => {
        const coffeesRef = firebase.firestore().collection('coffees');
        coffeesRef.get().then((querySnapshot) => {
            const coffeesData = [];
            querySnapshot.forEach((doc) => {
                coffeesData.push({ id: doc.id, ...doc.data() });
            });
            setCoffees(coffeesData);
        });
    }, [userId]);

    const handleQuantityChange = (coffeeId, quantity) => {
        setOrder(prevOrder => ({
            ...prevOrder,
            [coffeeId]: { ...prevOrder[coffeeId], quantity: quantity }
        }));
    };

    const handleSizeChange = (coffeeId, size) => {
        setOrder(prevOrder => ({
            ...prevOrder,
            [coffeeId]: { ...prevOrder[coffeeId], size: size }
        }));
    };

    const handleSubmit = async () => {
        const orderRef = firebase.firestore().collection('orders').doc();
        const orderNumber = orderRef.id;
        const items = Object.entries(order).map(([coffeeId, quantity]) => {
            const coffee = coffees.find(c => c.id === coffeeId);
            console.log(quantity.quantity)
            return {
                name: coffee ? coffee.name : 'Unknown Item',
                quantity: quantity.quantity
            };
        });

        await orderRef.set({
            customer: userId,
            items: items,
            deliveryTime: deliveryTime,
            totalPrice: calculateTotalPrice(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        navigate('/order-confirmation', { state: { orderNumber: orderNumber } });
    };


    const calculateTotalPrice = () => {
        let totalPrice = 0;
        for (const [coffeeId, orderDetails] of Object.entries(order)) {
            const coffee = coffees.find(coffee => coffee.id === coffeeId);
            if (coffee) {
                let sizeMultiplier = 1;
                if (orderDetails.size === 'Medium') sizeMultiplier = 1.3;
                if (orderDetails.size === 'Tall') sizeMultiplier = 1.5;
                totalPrice += (orderDetails.quantity * coffee.price * sizeMultiplier);
            }
        }
        return totalPrice.toFixed(2);
    };

    const handleDeliveryTimeChange = (e) => {
        setDeliveryTime(e.target.value);
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" sx={{ marginTop: "50px", marginLeft: "150px" }}>Order Coffee</Typography>
            <Paper style={{ padding: 20, marginTop: 50 }}>
                {user && <Typography variant="h5" sx={{ marginBottom: "50px", marginLeft: "100px" }}>{`Welcome ${user.name} ${user.surname}`}</Typography>}
                {coffees.map(coffee => (
                    <Grid container spacing={2} key={coffee.id}>
                        <Grid item xs={6} sx={{ marginTop: "15px" }}>
                            <Typography>{coffee.name} (${coffee.price})</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                type="number"
                                defaultValue={"0"}
                                InputProps={{ inputProps: { min: 0 } }}
                                onChange={(e) => handleQuantityChange(coffee.id, e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth style={{ marginTop: 2 }}>
                                <InputLabel id={`size-label-${coffee.id}`}>Size</InputLabel>
                                <Select
                                    labelId={`size-label-${coffee.id}`}
                                    id={`size-${coffee.id}`}
                                    value={order[coffee.id]?.size || 'Small'}
                                    label="Size"
                                    onChange={e => handleSizeChange(coffee.id, e.target.value)}
                                >
                                    <MenuItem value="Small">Small (${coffee.price})</MenuItem>
                                    <MenuItem value="Medium">Medium (${(coffee.price * 1.3).toFixed(2)})</MenuItem>
                                    <MenuItem value="Tall">Tall (${(coffee.price * 1.5).toFixed(2)})</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Delivery Time"
                        defaultValue={"now"}
                        onChange={handleDeliveryTimeChange}
                        style={{ marginTop: 20 }}
                    />
                </Grid>
                <Button
                    style={{ marginTop: 20 }}
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSubmit}
                >
                    Confirm Order
                </Button>
            </Paper>
        </Container>
    );
};

export default OrderForm;
