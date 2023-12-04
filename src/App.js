import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import Home from './Home';
import OrderForm from './OrderForm';
import { UserProvider } from './UserContext';
import OrderConfirmation from './OrderConfirmation';
import AdministrationForm from './AdministrationForm';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route exact path="/apollo-coffee-web-site" element={<Home />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="administration" element={<AdministrationForm />} />
          <Route path="*" element={<h1>404: Not Found</h1>} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
