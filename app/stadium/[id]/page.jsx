"use client";
import Image from "next/image";
import "./index.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";

const page = ({ params }) => {
  const [stadiums, setStadiums] = useState({
    name: "",
    location: "",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum quas itaque esse in doloremque, soluta ipsa illum laboriosam suscipit officia, saepe eligendi. Quos exercitationem perferendis ipsam eligendi, corrupti soluta necessitatibus laboriosam, blanditiis esse quasi itaque perspiciatis praesentium eveniet modi molestiae deleniti maiores est minus, rem deserunt ab quod. Debitis voluptate excepturi officia totam veniam eveniet laboriosam magni aliquid maxime reprehenderit!",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(`api/stadium/${params.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setStadiums(data);
            console.log(data);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const router = useRouter();
  const handleClick = () => {
    router.push(`/stadium/book/${params.id}`);
  };
  
  return (
    <div className="fullCard-container">
      <div className="inside">
        <div className="flex mt-8 mb-5 justify-end w-full">
          <p className=" font-medium text-xl mr-5">Welcome {" "} </p>
        <UserButton />
        </div>
        {/* <img className="image" src="./stadium1.jpg" /> */}
        <Image
          src="/stadium3.jpg"
          alt="Picture of the author"
          width={900}
          height={800}
          className="image"
        />
        <div className="stadium">{stadiums.name}</div>
        <div className="subheading">{stadiums.location}</div>
        <div className="timing">Capacity: {stadiums.capacity}</div>
        <div className="timing">Price: {stadiums.price} per Hour</div>
        <div className="description">{stadiums.information}</div>
        <div className="sports-container">
          <div className="sports-heading">Sports</div>
          <div className="sports">
            <div className="cricket">
              <Image
                src="/cricket.svg"
                alt="Picture of the author"
                width={100}
                height={100}
                className="cricket"
              />
              {/* <img className="cricket" src="./cricket.svg" /> */}
              <div className="title">Cricket</div>
            </div>
            <div className="football">
              <Image
                src="/football.svg"
                alt="Picture of the author"
                width={100}
                height={100}
                className="football"
              />
              {/*<img className="football" src="./football.svg" />*/}
              <div className="title">Football</div>
            </div>
          </div>
        </div>
        <button className="slots" onClick={handleClick}>
          View Available slots
        </button>
      </div>
    </div>
  );
};
export default page;
