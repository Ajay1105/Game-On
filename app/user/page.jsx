"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";

const Page = () => {
  const { isSignedIn, user } = useUser();
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setTransactions(data.transactions);
        setIsLoading(false);
        console.log(transactions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        {isSignedIn && (
          <div className="mb-4">
            <p className="text-2xl font-semibold my-8">
              Welcome {user.fullName}
            </p>
            {/*<div className="mt-2 flex justify-center my-8">
              <Image
                src={user.imageUrl}
                alt="user image"
                width={100}
                height={100}
                priority={true}
                className="rounded-full"
              />
        </div>*/}
          </div>
        )}
        {isLoading ? (
          <div className="text-gray-600">Loading...</div>
        ) : transactions && transactions.length > 0 ? (
          <div className="mt-4">
            <p className="text-lg font-semibold mb-2 italic">Bookings</p>
            {transactions.map((transaction) => (
              <div
                key={transaction._id}
                className="bg-gray-100 p-4 rounded-2xl mb-2 flex flex-row"
              >
                <div>
                  <img src="./icons/booking.png" alt="booking" className="w-10 h-10 mx-5 mt-2" />
                </div>
                <div>
                  <div className="text-sm md:text-lg mr-5 text-gray-600">
                    Time: {new Date(transaction.time).toLocaleString()}
                  </div>
                  <div className="text-sm md:text-base mr-5 text-gray-600">
                    Amount: {transaction.amount}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-600">No transactions found.</div>
        )}
      </div>
    </>
  );
};

export default Page;
