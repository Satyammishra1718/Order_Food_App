import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart, useDispatchCart } from './ContextReducer';

export default function CustomNavbar({ additionalClass }) {
  const [cartView, setCartView] = useState(false);
  let data = useCart();
  const dispatch = useDispatchCart();

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the cart state
    dispatch({ type: 'DROP' });

    // Clear the cart data in local storage
    localStorage.removeItem('cart');

    // Clear the user information (if any)
    localStorage.removeItem('authToken');

    // Redirect to the login page
    navigate('/login');
  }

  return (
    <>
      <Navbar bg="success" expand="lg" variant="dark" className={`px-3 ${additionalClass}`}>
        <Navbar.Brand as={Link} to="/" className="fs-3 fst-italic text-white">GoDineExpress</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link as={Link} to="/" className="nav-link nav-hover px-1 text-white fs-5 mt-1 mx-1">Home</Nav.Link>
          </Nav>
          {(localStorage.getItem("authToken")) &&
            <Nav>
              <Nav.Link as={Link} to="/myOrder" className="nav-link nav-hover px-1 text-white fs-5 mt-1 mx-1">My Orders</Nav.Link>
            </Nav>
          }
          {(!localStorage.getItem("authToken")) ?
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/login" className="nav-link btn custom-btn fs-5 mx-1 p-1 mobile_navbar">Login</Nav.Link>
              <Nav.Link as={Link} to="/createuser" className="nav-link btn custom-btn fs-5 mx-1 p-1 mobile_navbar">Signup</Nav.Link>
            </Nav> :
            <Nav className='ms-auto'>
            <div className="nav-link btn custom-btn fs-5 mt-1 me-2" onClick={() => setCartView(true)}>
            My Cart {data && data.length > 0 && <Badge pill bg="danger" style={{ marginBottom: '-10px' }}>{data.length}</Badge>}
            </div>
              <Nav.Link as={Link} to="/login" className="nav-link btn custom1-btn fs-5 mt-1 me-2" onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          }
        </Navbar.Collapse>
      </Navbar>
      {cartView && <Modal onClose={() => setCartView(false)}><Cart /></Modal>}
    </>
  );
}
