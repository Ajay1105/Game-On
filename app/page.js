"use client";
import Navbar from "../components/Navbar/Navbar.jsx";
import Card from "../components/Card/Card.jsx";
import FullCard from "../components/FullCard/FullCard.jsx";
import { useEffect, useState } from "react";

export default function Home() {
  const [stadiums, setStadiums] = useState([]);
  useEffect(() => {
    fetch(`api/stadiums`)
      .then((res) => res.json())
      .then((data) => {
        setStadiums(data);
      });
  }, []);

  return (
    <div className="container">
      <Navbar />
      <div className="card-container">
        <Card heading="Stadium 1" />
        <Card heading="Stadium 2" />
        <Card heading="Stadium 3" />
        <Card heading="Stadium 4" />
      </div>
    </div>
  );
}
