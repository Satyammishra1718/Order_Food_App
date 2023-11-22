import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import CustomNavbar from '../components/Navbar';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchOrderData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/myorderData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: localStorage.getItem('userEmail'),
        }),
      });

      if (response.status === 200) {
        const json = await response.json();
        setOrderData(json.orderData);
      } else {
        console.error('Failed to fetch order data');
      }
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []); 

  return (
    <>
      <div>
        <CustomNavbar additionalClass="mob_nav" />
        <div className="container mt-4 mob_orders">
          {orderData.length === 0 ? (
            <p className="no-orders-message">No orders have been made till now.</p>
          ) : (
            orderData.map((order, orderIndex) => (
              <Card key={orderIndex} className="mb-3">
                <Card.Header className="d-flex justify-content-between">
                  <strong>Order Date:</strong> 
                  <span>{order[0].Order_date}</span>
                </Card.Header>
                <ListGroup variant="flush">
                  {order.slice(1).map((item, itemIndex) => (
                    <ListGroupItem key={itemIndex}>
                      # {item.name} <span className="custom-space"></span> <strong>Quantity:</strong> {item.qty} <span className="custom-space"></span> <strong>Size:</strong> {item.size} <span className="custom-space"></span> <strong>Price:</strong> {item.price}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </Card>
            ))
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}
