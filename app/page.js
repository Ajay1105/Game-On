"use client";
import React from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import Card from "../components/Card/Card.jsx";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CardContent } from "@/components/ui/card";
import { gallery } from "@/lib/constants";
import Footer from "@/components/Footer/Footer.jsx";
import { razorpayPayment } from "./actions/transaction.action.js";

export default function Home() {
  const [stadiums, setStadiums] = useState([]);

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const handleclick = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    const data = await fetch("/api/razorpay", {
      method: "POST",
      body: JSON.stringify({ amount: 108 }),
    }).then((t) => t.json());

    console.log(data);
    
    var options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: "Game on",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thankyou for your test donation",
      image: "./logo2.png",
      handler: function (response) {
        // Validate payment at server - using webhooks is a better idea.
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "Manu Arora",
        email: "manuarorawork@gmail.com",
        contact: "9999999999",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch("api/stadium", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setStadiums(data.stadiums);
            console.log(data.stadiums);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true, waitForTransition: true })
  );

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="card-container">
          {/*stadiums.map((stadium) => (
      <Card key={stadium.id} heading={stadium.name} id={stadium._id} location={stadium.location}/>
    ))*/}
          <Card
            key={"stadium.id"}
            heading={"Cricket world "}
            id={"65e3ff42d02e44dfa7bdd90c"}
            location={
              " Verka Milk Plant Road, near Fair Farm Marriage Palace, Jalandhar, Punjab 144001"
            }
          />
        </div>
      </div>

      <div className="mx-12 flex justify-center items-center flex-col">
        <p className="mt-6 md:mt-12 text-yellow-500 text-4xl md:text-[3rem] font-extrabold italic">
          Welcome to GameOn
        </p>
        <img
          src="./icons/football.png"
          alt="football"
          className="size-[50%] md:w-1/4 md:h-1/4"
          onClick={handleclick}
        />
        <p className="text-2xl mt-10 font-medium italic text-justify">
          {" "}
          your ultimate destination for sports enthusiasts! At GameOn, we're
          passionate about revolutionizing the way you experience sports. Our
          mission is to provide a seamless platform where you can easily
          discover, book, and enjoy various sports facilities. Join us on this
          exciting journey and let's elevate the game together
        </p>
      </div>

      <div className="flex flex-col items-center justify-center w-full">
        <p className="mt-12 text-yellow-500 text-3xl italic mb-20">
          Previous Events
        </p>
        <Carousel plugins={[plugin.current]} className="w-[65vw] md:w-[80vw]">
          <CarouselContent>
            {gallery.map((img, index) => (
              <CarouselItem key={index}>
                <div className="md:ml-32 p-1 w-[60vw] md:w-[60vw] flex justify-center items-center">
                  <div className="w-[60vw] md:w-[30vw]">
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <img src={img.src} alt={img.alt} />
                    </CardContent>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <Footer />
    </div>
  );
}
