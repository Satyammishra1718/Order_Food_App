import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Card from "../components/Card";
import CustomNavbar from "../components/Navbar";

function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(true);

  const loadData = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setLoggedIn(false);
      return;
    }

    let response = await fetch('http://localhost:5000/api/foodData', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();

    setFoodItem(response[0]);
    setFoodCat(response[1]);
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      <div>
        <CustomNavbar additionalClass="mob_nav"/>
      </div>
      {isLoggedIn ? (
        <div>
          <div id="carouselExampleFade" className="carousel slide carousel-fade mob_img" data-bs-ride="carousel" data-bs-interval="5000" style={{ objectFit: "contain" }}>
            <div className="carousel-inner" id='carousel'>
              <div className='carousel-caption' style={{ zIndex: "10" }}>
                <div className='d-flex justify-content-center'>
                  <div className='col-lg-6 col-md-8 col-10'>
                    <input className='form-control me-2' type='search' placeholder='Search' aria-label='Search' value={search} onChange={(e) => { setSearch(e.target.value) }} />
                  </div>
                </div>
              </div>
              <div className="carousel-item active">
                <img src="https://source.unsplash.com/random/?burger" height="528" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
              </div>
              <div className="carousel-item">
                <img src="https://source.unsplash.com/random/?pastry" height="528" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
              </div>
              <div className="carousel-item">
                <img src="https://source.unsplash.com/random/?pizza" height="528" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
              </div>
            </div>
          </div>
          <div className="container">
            {foodCat.length && foodCat.map((data) => {
              return (
                <div className="row mb-3" key={data._id}>
                  <div className="fs-3 m-3 ">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem.length && foodItem.filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                    .map(filterItems => {
                      return (
                        <div key={filterItems._id} className="col-12 col-md-6 col-lg-3 mx-4 m-2">
                          <Card foodItems={filterItems}
                            options={filterItems.options[0]}
                          ></Card>
                        </div>
                      )
                    })}
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div>
          <div className="alert alert-info text-center mt-4 mob_msg" role="alert">
            Please log in to access the content.
          </div>
        </div>
      )}
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
