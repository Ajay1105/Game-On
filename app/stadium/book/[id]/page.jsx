"use client";
import { UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { loadStripe } from "@stripe/stripe-js";
import { checkoutCredits } from "@/app/actions/transaction.action.js";
import "./index.css";
import Navbar from "@/components/Navbar/Navbar";
import { createUser } from "@/app/actions/user.action.js";

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
  const [time, setTime] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [stadiumInfo, setstadiumInfo] = useState({});
  const [captainName, setCaptainName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [numberOfPlayers, setNumberOfPlayers] = useState("");
  const { user, isSignedIn } = useUser();

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

  const makePayment = async (transaction) => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    const data = await fetch("/api/razorpay", {
      method: "POST",
      body: JSON.stringify({ amount: transaction.amount }),
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
        name: transaction.captainName,
        email: transaction.email,
        contact: transaction.phoneNumber,
      },
      notes: {
        stadiumId: transaction.stadiumId,
        amount: transaction.amount,
        time: transaction.time,
        email: transaction.email,
        captainName: transaction.captainName,
        phoneNumber: transaction.phoneNumber,
        noOfPlayers: transaction.numberOfPlayers,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }, []);

  useEffect(() => {
    fetch(`/api/stadium/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setstadiumInfo(data.stadium);
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
          available: !bookedSlots?.some(
            (bookedSlot) =>
              bookedSlot.startTime ===
              event.target.value + "T" + slotTime + ".000Z"
          ),
        };
      })
    );
  };

  useEffect(() => {
    const create = async () => {
      if (user) {
        const user2 = {
          email: user.emailAddresses[0].emailAddress,
          name: user.fullName,
        };

        await createUser(user2);
      }
    };
    create();
  }, [user]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      alert("Your slot has been booked successfully");
    }
    if (query.get("canceled")) {
      alert("Order canceled!");
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const price = Math.max(1000, 1000 + ((numberOfPlayers-5)*100));
    onCheckout(price);
  };

  const bookSlot = (time) => {
    setIsBooking(true);
    setTime(time);
  };

  let email;
  if (isSignedIn) {
    email = user.emailAddresses[0].emailAddress;
  }
  const onCheckout = async (price) => {
    const transaction = {
      plan: stadiumInfo.name,
      stadiumId: stadiumInfo._id,
      amount: price ,
      time:
      selectedDate +
      "T" +
      time.replace(" AM", ":00").replace(" PM", ":00") +
      ".000Z",
      email: email,
      captainName: captainName,
      phoneNumber: phoneNumber,
      noOfPlayers: numberOfPlayers,
    };
    console.log("stadiumInfo ", stadiumInfo)
    console.log("transaction ", transaction)
    await makePayment(transaction);
  };

  return (
    <div className="relative">
      <div className="mx-auto">
        <div className="flex mt-5 pr-12 md:pr-24 justify-end w-full">
          <p className=" font-medium text-xl mr-5 stadium-subheading">
            Welcome{" "}
          </p>
          <UserButton />
        </div>
        <Navbar />
        <h1 className="stadium-heading text-8xl font-bold mb-4 pt-8 w-full flex justify-center">
          Stadium Booking
        </h1>
        <div className="stadium-details flex flex-col items-center gap-4 justify-center mb-4 mt-10">
          <div className="taarik">
            <label htmlFor="date" className="stadium-subheading mr-2 text-2xl">
              Select Date:
            </label>
            <input
              type="date"
              id="date"
              className="text-black px-5 py-2 rounded-sm cursor-pointer stadium-subheading"
              onChange={handleDateChange}
            />
          </div>
          <p className="stadium-subheading price text-xl font-medium">
            Price: {stadiumInfo.price} per Hour
          </p>
        </div>
        {selectedDate && (
          <div className="flex justify-center items-center flex-col">
            <h2 className="stadium-subheading text-2xl font-semibold mb-2 mt-5">
              Available Slots at {selectedDate}
            </h2>
            <ul className="flex justify-start pl-20 mt-10 w-[85%] mx-auto flex-wrap gap-8 gap-y-10">
              {availableSlots.map((slot, index) => (
                <li key={index} className="flex items-center mb-2">
                  <span className="mr-2">{slot.time}</span>
                  {slot.available ? (
                    <button
                      className="px-[6rem] font-semibold py-3 cursor-pointer transition-colors bg-green-500 hover:bg-green-700 text-white rounded-2xl stadium-subheading book-button"
                      onClick={() => bookSlot(slot.time)}
                    >
                      Book Now
                    </button>
                  ) : (
                    <span className="px-[5.2rem] font-semibold py-3 text-white transition-colors bg-red-500 hover:bg-red-700 rounded-2xl cursor-pointer stadium-subheading book-button">
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