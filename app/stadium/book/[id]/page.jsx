"use client";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    fetch(`/api/stadium/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setBookedSlots(data.bookedSlots);
      });
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setAvailableSlots(
        slots.map((slot) => {
          const slotTime = slot.time.replace(" AM", ":00").replace(" PM", ":00");
          return {
            time: slot.time,
            available: !bookedSlots.some(
              (bookedSlot) =>
                bookedSlot.startTime === event.target.value + "T" + slotTime + ".000Z"
            ),
          };
        })
      );
  };
  
    const bookSlot = (time) => {
    fetch(`/api/stadium/book`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: params.id,
        startTime: selectedDate + "T" + time.replace(" AM", ":00").replace(" PM", ":00") + ".000Z",
        endTime: selectedDate + "T" + time.replace(" AM", ":00").replace(" PM", ":00") + ".000Z",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    }
  console.log(bookedSlots);
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Stadium Booking</h1>
      <div className="flex mb-4">
        <label htmlFor="date" className="mr-2">
          Select Date:
        </label>
        <input type="date" id="date" onChange={handleDateChange} />
      </div>
      {selectedDate && (
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Available Slots for {selectedDate}:
          </h2>
          <ul>
            {availableSlots.map((slot, index) => (
              <li key={index} className="flex items-center mb-2">
                <span className="mr-2">{slot.time}</span>
                {slot.available ? (
                  <button className="px-4 py-2 bg-green-500 text-white rounded-md" onClick={()=>bookSlot(slot.time)}>
                    Book Now
                  </button>
                ) : (
                  <span className="text-red-500">Not Available</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}