"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isBooked, setIsBooked] = useState(false);
  const [stadiumInfo, setstadiumInfo] = useState({ price: 0 });
  const [isBooking, setIsBooking] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      };

      fetch("/api/admin/auth", requestOptions)
        .then((response) => {
          if (!response.ok) {
            router.push("/admin/login");
          }
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    };
    checkToken();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/stadium/admin/${params.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setBookedSlots(data.stadium.bookedSlots);
        setstadiumInfo(data.stadium);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
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

  const bookSlot = (time) => {
    setIsBooking(true);
    setTime(time);
  };

  const onCheckout = (price) => {
    fetch(`/api/stadium/book`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: params.id,
        startTime:
          selectedDate +
          "T" +
          time.replace(" AM", ":00").replace(" PM", ":00") +
          ".000Z",
        endTime:
          selectedDate +
          "T" +
          time.replace(" AM", ":00").replace(" PM", ":00") +
          ".000Z",
        captainName: "Booked by admin",
        phoneNumber: -1,
        noOfPlayers: -1,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log("Booked for the slot");
      });
    setIsBooked(true);
    setIsBooking(false);
    setSelectedDate(null);
  };

  return (
    <div>
      <div className="mx-auto">
        <Navbar />
        <h1 className="text-5xl md:text-8xlfont-bold mb-4 pt-8 w-full flex justify-center">
          Admin Ground
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
                      className="px-[6rem] font-semibold py-3 cursor-pointer transition-colors bg-green-500 hover:bg-green-700 text-white rounded-2xl"
                      onClick={() => bookSlot(slot.time)}
                    >
                      Book Now
                    </button>
                  ) : (
                    <span className="px-[5.2rem] font-semibold py-3 text-white transition-colors bg-red-500 hover:bg-red-700 rounded-2xl cursor-pointer">
                      Booked
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
      {isBooking && (
        <div className="container absolute top-10 md:left-10 md:mx-8 h-fit md:h-[90vh] w-[100vw] flex items-center justify-center align-middle p-8 border-2 border-white">
          <p className="text-red-500 absolute right-10 top-10 text-2xl font-extrabold" onClick={()=>setIsBooking(false)}>X</p>
          <div className="flex flex-col items-center mt-10 justify-center align-middle">
            <h2 className="text-2xl font-semibold mb-2">
              Confirm Booking for {time} on {selectedDate}
            </h2>
            <button
              className="px-[6rem] font-semibold py-3 cursor-pointer transition-colors bg-green-500 hover:bg-green-700 text-white rounded-2xl mt-5"
              onClick={() => onCheckout(stadiumInfo.price)}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
