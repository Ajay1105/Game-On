"use client";
import { UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { checkoutCredits } from "@/app/actions/transaction.action.js";

const slots = [
  { time: "09:00 AM", available: true },
  { time: "10:00 AM", available: true },
  { time: "11:00 AM", available: true },
  { time: "12:00 AM", available: true },
  { time: "01:00 AM", available: true },
  { time: "02:00 AM", available: true },
  { time: "03:00 AM", available: true },
  { time: "04:00 AM", available: true },
];

export default function page({ params }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isBooked, setIsBooked] = useState(false);
  const [stadiumInfo, setstadiumInfo] = useState({});

  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }, []);

  useEffect(() => {
    fetch(`/api/stadium/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setstadiumInfo(data);
        setBookedSlots(data.bookedSlots);
      });
  }, [isBooked, params.id, selectedDate]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setAvailableSlots(
      slots.map((slot) => {
        const slotTime = slot.time.replace(" AM", ":00").replace(" PM", ":00");
        return {
          time: slot.time,
          available: !bookedSlots.some(
            (bookedSlot) =>
              bookedSlot.startTime ===
              event.target.value + "T" + slotTime + ".000Z"
          ),
        };
      })
    );
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      alert("Your slot has been booked successfully");
      // fetch(`/api/stadium/book`, {
      //   method: "PATCH",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     id: params.id,
      //     startTime:
      //       selectedDate +
      //       "T" +
      //       time.replace(" AM", ":00").replace(" PM", ":00") +
      //       ".000Z",
      //     endTime:
      //       selectedDate +
      //       "T" +
      //       time.replace(" AM", ":00").replace(" PM", ":00") +
      //       ".000Z",
      //   }),
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log(data);
      //     console.log("Booked for the slot");
      //   });
      // setIsBooked(true);

      // setSelectedDate(null);
    }
    if (query.get("canceled")) {
      alert("Order canceled!");
    }
  }, []);
  
  const bookSlot = (time) => {
    onCheckout(time);
  };

  const onCheckout = async (time) => {
    const transaction = {
      plan: stadiumInfo.name,
      stadiumId: stadiumInfo._id,
      amount: stadiumInfo.price,
      time:
        selectedDate +
        "T" +
        time.replace(" AM", ":00").replace(" PM", ":00") +
        ".000Z",
    };
    await checkoutCredits(transaction);
  };

  return (
    <div className="mx-auto">
      <div className="flex mt-8 mb-5 pr-20 justify-end w-full">
        <p className=" font-medium text-xl mr-5">Welcome </p>
        <UserButton />
      </div>
      <h1 className="text-8xl font-bold mb-4 pt-8 w-full flex justify-center">
        Stadium Booking
      </h1>
      <div className="flex items-center justify-center mb-4 mt-10">
        <label htmlFor="date" className="mr-2 text-2xl">
          Select Date:
        </label>
        <input
          type="date"
          id="date"
          className="text-black px-5 py-2 rounded-sm cursor-pointer"
          onChange={handleDateChange}
        />
      </div>
      <p className=" text-xl font-medium pl-32">
        Price: {stadiumInfo.price} per Hour
      </p>
      {selectedDate && (
        <div className="flex justify-center items-center flex-col">
          <h2 className="text-2xl font-semibold mb-2 mt-5">
            Available Slots at {selectedDate}
          </h2>
          <ul className="flex justify-start pl-20 mt-10 w-[85%] mx-auto flex-wrap gap-8 gap-y-10">
            {availableSlots.map((slot, index) => (
              <li key={index} className="flex items-center mb-2">
                <span className="mr-2">{slot.time}</span>
                {slot.available ? (
                  <button
                    className="px-[6rem] font-semibold py-3 cursor-pointer transition-colors bg-green-500 hover:bg-green-700 text-white rounded-sm"
                    onClick={() => bookSlot(slot.time)}
                  >
                    Book Now
                  </button>
                ) : (
                  <span className="px-[5.2rem] font-semibold py-3 text-white transition-colors bg-red-500 hover:bg-red-700 rounded-sm cursor-pointer">
                    Not Available
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex justify-center align-middle my-20">
        {isBooked && (
          <p className="text-green-400 text-xl">
            Your slot has been booked successfully
          </p>
        )}
      </div>
    </div>
  );
}
