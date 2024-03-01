"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Image from "next/image";

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
    <div>
      Welcome {isSignedIn && user.fullName}
      {isSignedIn && (
        <Image
          src={user.imageUrl}
          alt="user image"
          width={100}
          height={100}
          priority={true}
        />
      )}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        transactions.length > 0 && (
          <div>
            <p>Bookings</p>
            {transactions.map((transaction) => (
            <div key={transaction._id}>
              <div>Time: {transaction.time}</div>
              <div>Amount: {transaction.amount}</div>
            </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Page;
