import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import firebase from './firebase';

const Home = () => {
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      const querySnapshot = await firebase.firestore().collection('orders')
        .orderBy('createdAt', 'desc')
        .limit(10)
        .get();

      const orders = [];
      querySnapshot.forEach(doc => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      setRecentOrders(orders);
    };

    fetchRecentOrders();
  }, []);

  return (
    <Container maxWidth="sm" style={{ marginTop: 20 }}>
      <Paper style={{ padding: 20 }}>
        <Typography variant="h5">Recent 10 Orders</Typography>
        <List>
          {recentOrders.map((order, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`Order Price: $${order.totalPrice}`}
                secondary={
                  Array.isArray(order.items) && order.items.length > 0
                    ? order.items.map(item => `${item.quantity} ${item.name}`).join(', ')
                    : 'No items'
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Typography variant="h5" sx={{marginTop: "50px"}}>To add a new coffee type, create a new account with type "Worker", then a new form will be available on navigation bar. To give a new order, create a new account or login to an existing one.</Typography>
    </Container>
  );
};

export default Home;
