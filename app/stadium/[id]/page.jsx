"use client";
import Image from "next/image";
import "./index.css";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar/Navbar";
import Loader from "@/components/Loader/Loader";

const page = ({ params }) => {
  const [stadiums, setStadiums] = useState({
    name: "",
    location: "",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum quas itaque esse in doloremque, soluta ipsa illum laboriosam suscipit officia, saepe eligendi. Quos exercitationem perferendis ipsam eligendi, corrupti soluta necessitatibus laboriosam, blanditiis esse quasi itaque perspiciatis praesentium eveniet modi molestiae deleniti maiores est minus, rem deserunt ab quod. Debitis voluptate excepturi officia totam veniam eveniet laboriosam magni aliquid maxime reprehenderit!",
  });

  const gallery = [
    {
      src: "/assests/Website_img1.png",
      alt: "stadium1",
    },
    {
      src: "/assests/Website_img2.png",
      alt: "stadium2",
    },
    {
      src: "/assests/Website_img3.png",
      alt: "stadium3",
    },
    {
      src: "/assests/Website_img4.png",
      alt: "stadium4",
    },
    {
      src: "/assests/Website_img5.png",
      alt: "stadium4",
    },
  ];

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

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true, waitForTransition: true })
  );

  return (
    <div>
      <Navbar />
      <div className="fullCard-container">
        <div className="inside">
          {/*<div className="flex mt-8 mb-5 justify-end w-full">
            <p className=" font-medium text-xl mr-5">Welcome </p>
            <UserButton />
          </div>
           <img className="image" src="./stadium1.jpg" /> 
        <Image
          src="/cricket.jpg"
          alt="Picture of the author"
          width={600}
          height={300}
          className="image"
        /> */}
            <Carousel
              plugins={[plugin.current]}
              className="w-[100vw] md:w-[80vw]"
            >
              <CarouselContent>
                {gallery.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="md:ml-32 p-1 w-[100vw] md:w-[60vw] flex justify-center items-center">
                      <div className="w-[100vw] md:w-[30vw]">
                        <CardContent className="flex aspect-square items-center relative justify-center p-0">
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-[100vw] h-auto"
                          />
                          <img
                            src={"/icons/map.png"}
                            alt={img.alt}
                            className="border-2 border-black p-2 rounded-full mr-4 size-16 cursor-pointer z-10 absolute bottom-2 right-0"
                            onClick={() => {
                              window.open(
                                "https://www.google.com/maps/place/Cricket+World+(+Box+Cricket+)/@31.3716745,75.5496146,17z/data=!3m1!4b1!4m6!3m5!1s0x391a518227210e19:0xc791bfca43093e14!8m2!3d31.3716745!4d75.5521895!16s%2Fg%2F11rmv38c2c?entry=ttu",
                                "_blank"
                              );
                            }}
                          />
                        </CardContent>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

          <div className="stadium-info">
            <p>
              <span className="text-yellow-400 text-2xl italic">
                Open 24 hours
              </span>
            </p>
            <p>
              <b>Ground name</b> - Cricket world
            </p>
            <p>
              <b>Address</b>- Verka Milk Plant Road, near Fair Farm Marriage
              Palace, Jalandhar, Punjab 144001
            </p>
            <p>
              <b>Description</b>: Cricket World, the ultimate sports destination
              for box cricket ,is open 24/7. With dimensions spanning 120x60,
              it's the ideal locationfor cricket enthusiasts. Come, play, have
              fun & compete among your friends in your favourite sport.
            </p>
            <p>
              <b>Turfs</b> <br /> Area-120 x 60
            </p>
            <div>
              <p className=" text-2xl italic">Venue facilities</p>
              <div className=" my-5 flex flex-wrap gap-4">
                <div>
                  <img
                    src="../icons/parking_icon.jpg"
                    className="bg-white size-16 md:size-20 rounded-full ring-3"
                  />
                  <p>Parking</p>
                </div>
                <div className="w-[5rem]">
                  <img
                    src="../icons/changing_room_icon.jpg"
                    className="bg-white size-16 md:size-20 rounded-full ring-3"
                  />
                  <p className=" text-center">Changing Room</p>
                </div>
                <div>
                  <img
                    src="../icons/washroom_icon.png"
                    className="bg-white size-16 md:size-20 rounded-full ring-3"
                  />
                  <p>Washroom</p>
                </div>
              </div>
            </div>
            <div>
              <p className=" text-2xl italic">Prohibition</p>
              <div className=" my-5 flex flex-wrap gap-4">
                <div>
                  <img
                    src="../icons/No_spitting_icon.webp"
                    className="bg-white size-16 md:size-20 rounded-full ring-3"
                  />
                  <p>No Spitting</p>
                </div>
                <div>
                  <img
                    src="../icons/No_alcohol_icon.jpg"
                    className="bg-white size-16 md:size-20 rounded-full ring-3"
                  />
                  <p>No Alcohol</p>
                </div>
              </div>
            </div>
          </div>
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
              <div className="football ml-12 md:ml-40">
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
    </div>
  );
};
export default page;
