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
  const [captainName, setCaptainName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [numberOfPlayers, setNumberOfPlayers] = useState("");
  const [time, setTime] = useState("")

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
        const response = await fetch(`/api/stadium/${params.id}`, {
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
        captainName: captainName,
        phoneNumber: phoneNumber,
        noOfPlayers: numberOfPlayers,
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const price = Math.max(1000, numberOfPlayers);
    onCheckout(price);
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
        <div className="container absolute top-0 md:mx-8 h-fit md:h-[100vh] w-[100vw] flex items-center justify-center align-middle p-8 border-2 border-white">
          <div className="flex flex-col h-fit w-fit">
            <p className="text-3xl mb-6 font-semibold text-white">
              Enter your details to book the slot
            </p>
            <p className="text-lg mb-6 font-semibold text-white">
              <span className="text-red-500">NOTE: </span> You can book upto 20
              players
            </p>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="mb-4">
                <label
                  htmlFor="captainName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Captain's Name
                </label>
                <input
                  type="text"
                  id="captainName"
                  className="mt-1 p-2 w-full border-gray-300 rounded-2xl text-black"
                  placeholder="Enter captain's name"
                  value={captainName}
                  onChange={(e) => setCaptainName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  className="mt-1 p-2 w-full border-gray-300 rounded-2xl text-black"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="numberOfPlayers"
                  className="block text-sm font-medium text-gray-700"
                >
                  Number of Players
                </label>
                <input
                  type="number"
                  id="numberOfPlayers"
                  className="mt-1 p-2 w-full border-gray-300 rounded-2xl text-black"
                  placeholder="Enter number of players"
                  value={numberOfPlayers}
                  onChange={(e) => setNumberOfPlayers(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-2xl hover:bg-blue-600 transition duration-300"
              >
                Pay
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
