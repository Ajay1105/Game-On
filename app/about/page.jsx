import Navbar from "@/components/Navbar/Navbar";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="mx-12 flex justify-center items-center flex-col">
      <p className=" text-yellow-500 text-4xl md:text-[5rem] font-extrabold italic">Welcome to GameOn</p> 
      <img src="./icons/football.png" alt="football" className="size-[50%] md:w-1/4 md:h-1/4" />
        <p className="text-2xl mt-10 font-medium italic text-justify"> your ultimate destination for sports enthusiasts! At
        GameOn, we're passionate about revolutionizing the way you experience
        sports. Our mission is to provide a seamless platform where you can
        easily discover, book, and enjoy various sports facilities. Join us on
        this exciting journey and let's elevate the game together</p>
      </div>
    </div>
  );
};

export default page;
