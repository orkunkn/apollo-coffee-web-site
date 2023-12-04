import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import firebase from './firebase';
import { useLocation } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState(null);
  const [coffees, setCoffees] = useState([]);

  useEffect(() => {
    const fetchCoffees = async () => {
      const querySnapshot = await firebase.firestore().collection('coffees').get();
      const coffeesData = [];
      querySnapshot.forEach(doc => {
        coffeesData.push({ id: doc.id, ...doc.data() });
      });
      setCoffees(coffeesData);
    };

    fetchCoffees();

    const orderId = location.state?.orderNumber;

    if (orderId) {
      const orderRef = firebase.firestore().collection('orders').doc(orderId);
      orderRef.get().then((doc) => {
        if (doc.exists) {
          setOrderDetails(doc.data());
        }
      });
    }
  }, [location.state]);

  if (!orderDetails || coffees.length === 0) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="sm" style={{ marginTop: 20 }}>
      <Paper style={{ padding: 20 }}>
        <Typography variant="h4" align="center">Thank You!</Typography>
        <Typography variant="h6">Order Number: {location.state?.orderNumber}</Typography>
        <List>
          {orderDetails.items.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${item.quantity} ${item.name}`} />
            </ListItem>
          ))}
          <ListItem>
            <ListItemText primary={`Total Price: $${orderDetails.totalPrice}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Delivery Time: ${orderDetails.deliveryTime}`} />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default OrderConfirmation;
