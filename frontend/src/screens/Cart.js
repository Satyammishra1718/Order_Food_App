import React from 'react';
import { useCart,useDispatchCart } from '../components/ContextReducer';
import trash from "../images/trash.png";
export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();

    const formatOrderDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        return date.toLocaleDateString('en-US', options);
      }

    if(data.length === 0){
        return(
            <div>
                <div className=' w-100 text-center fs-3'>The Cart is Empty!</div>
            </div>   
        )
    }

    const handleCheckOut = async()=>{
        let userEmail = localStorage.getItem("userEmail");
        let response = await fetch("http://localhost:5000/api/orderData",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                order_data : data,
                email : userEmail,
                order_date: formatOrderDate(new Date())
            })
        });
        if(response.status === 200){
            dispatch({type:"DROP"})
        }
    }


    let totalPrice = data.reduce((total,food)=>total + food.price, 0);

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover'>
            <thead className='text-success fs-4'>
                <tr>
                    <th scope='col' className="text-center">#</th>
                    <th scope='col' className="text-center">Name</th>
                    <th scope='col' className="text-center">Quantity</th>
                    <th scope='col' className="text-center">Option</th>
                    <th scope='col' className="text-center">Amount</th>
                    <th scope='col'></th>
                </tr>
            </thead> 
            <tbody >
                {data.map((food, index) => {
                return (
            <tr key={index}>
                <th scope='row' className="text-center">{index + 1}</th>
                <td className="text-center">{food.name}</td>
                <td className="text-center">{food.qty}</td>
                <td className="text-center">{food.size}</td>
                <td className="text-center">{food.price}</td>
                <td><button type='button' className='btn p-0 '><img src={trash}  style={{ width: '20px', height: '20px', filter: 'invert(1)', marginTop: '-9px' }} alt="delete" onClick={()=>{dispatch({type:"REMOVE",index:index})}}/> </button></td>
            </tr>
        );
    })}
</tbody>
        </table>
        <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md d-flex flex-column align-items-center'>
        <h1 className='fs-2'>Total Price : {totalPrice}/-</h1>
        <div>
          <button className='btn bg-success mt-4 mb-3' onClick={handleCheckOut}>Check Out</button>
        </div>
        </div>
      </div>
    </div>
  )
}
