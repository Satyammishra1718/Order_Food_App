import React, { useState, useRef, useEffect } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();

  const priceRef = useRef();

  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleAddToCart = async () => {
    let finalPrice = qty * parseInt(options[size]);
    const existingItem = data.find(
      (item) => item.id === props.foodItems._id && item.size === size
    );

    if (existingItem) {
      await dispatch({
        type: 'UPDATE',
        id: props.foodItems._id,
        price: finalPrice,
        qty: qty,
      });
    } else {
      await dispatch({
        type: 'ADD',
        payload: {
          id: props.foodItems._id,
          name: props.foodItems.name,
          img: props.foodItems.img,
          price: finalPrice,
          desc: props.foodItems.description,
          qty: qty,
          size: size,
        },
      });
    }
    setShowMessage(true);

    // Hide the message after 5 seconds
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  };

  let finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div>
        <div className="card mt-3" style={{ width: '20rem', maxHeight: '450px' }}>
          <img
            src={props.foodItems.img}
            className="card-img-top"
            alt="..."
            style={{ height: '150px', objectFit: 'fill' }}
          />
          <div className="card-body">
            <h5 className="card-title">{props.foodItems.name}</h5>
            <p className="card-text ">{props.foodItems.description}</p>
            <div className="container w-100 d-flex p-0">
              <select
                className="mt-2 h-100 bg-success ms-2 me-4"
                onChange={(e) => setQty(e.target.value)}
              >
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>

              <select
                className="mt-2 h-100 bg-success rounded me-5"
                ref={priceRef}
                onChange={(e) => setSize(e.target.value)}
              >
                {priceOptions.map((data) => {
                  return <option key={data} value={data}>{data}</option>;
                })}
              </select>
              <div className="d-inline h-100 fs-5 mx-5 mt-1">
                ₹{finalPrice}/-
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <button
                className="btn btn-success justify-center ms-2"
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>
              {showMessage && (
                <div className="text-success ms-2 mt-2 fs-5">Added to Cart!!!</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
