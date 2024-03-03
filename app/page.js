"use client";
import Navbar from "../components/Navbar/Navbar.jsx";
import Card from "../components/Card/Card.jsx";
import { useEffect, useState } from "react";

export default function Home() {
  const [stadiums, setStadiums] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch("api/stadium", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json())
        .then((data) => {
          setStadiums(data.stadiums);
          console.log(data.stadiums);
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <div className="card-container"> 
        {/*stadiums.map((stadium) => (
          <Card key={stadium.id} heading={stadium.name} id={stadium._id} location={stadium.location}/>
        ))*/}
        <Card key={"stadium.id"} heading={"Cricket world "} id={"65e3ff42d02e44dfa7bdd90c"} location={" Verka Milk Plant Road, near Fair Farm Marriage Palace, Jalandhar, Punjab 144001"}/>
      </div>
    </div>
  );
}