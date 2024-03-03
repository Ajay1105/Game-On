"use client";
import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { gallery } from "@/lib/constants";

const page = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true, waitForTransition: true })
  );
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full">
        <p className=" text-3xl italic mb-20">Previous Events</p>
        <Carousel plugins={[plugin.current]} className="w-[65vw] md:w-[80vw]">
          <CarouselContent>
            {gallery.map((img, index) => (
              <CarouselItem key={index}>
                <div className="md:ml-32 p-1 w-[60vw] md:w-[60vw] flex justify-center items-center">
                  <Card className="w-[60vw] md:w-[30vw]">
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <img src={img.src} alt={img.alt}/>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default page;
