"use client";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const page = () => {
  const gallery = [
    {
      src: "/assests/event1.png",
      alt: "event1",
    },
    {
      src: "/assests/event2.png",
      alt: "event2",
    },
  ];
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true, waitForTransition: true })
  );

  return (
    <div>
      <Navbar />
      <div className="flex items-center flex-col text-center">
        <Carousel plugins={[plugin.current]} className="w-[100vw] md:w-[80vw]">
          <CarouselContent>
            {gallery.map((img, index) => (
              <CarouselItem key={index}>
                <div className="md:ml-48 p-1 w-[100vw] md:w-[60vw] flex justify-center items-center">
                  <div className="w-[100vw] md:w-[30vw]">
                    <CardContent className="flex aspect-square items-center relative justify-center p-0">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-[100vw] h-auto"
                      />
                    </CardContent>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
        <h2 className="text-3xl md:text-5xl mt-8 font-medium text-yellow-600">
          Box <span className="text-white">Cricket</span> Tournament
        </h2>
        <a href="https://forms.gle/CUbniiop7n811Y6a8" target="_blank">
        <button className="px-8 py-4 rounded-3xl mt-7 bg-orange-700 text-white hover:bg-orange-400">
        Register Now
        </button>
        </a>
      </div>
      <Footer />
    </div>
  );
};

export default page;
