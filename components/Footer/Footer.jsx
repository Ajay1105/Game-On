import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col justify-center text-center mt-8 pt-4 border-t-2 border-white">
    <div className="flex md:flex-row flex-col gap-4 justify-center">
    <p className="text-xl">+918896172818</p>
    <p className="text-xl">help@gameon.com</p>
    </div>
      <div className=" flex flex-row justify-center gap-8 my-4">
        <a href="https://www.instagram.com/_gameon_india?igsh=MTRhMHFvMG1rYWRjbw==" target="_blank"><img src="/icons/instagram.png" className="w-10 h-10 invert" /></a>
        <a href="https://www.linkedin.com/company/gameonfit/" target="_blank"><img src="/icons/linkedin.png" className="w-10 h-10 invert" /></a>
      </div>
      <p className="py-2">&copy; 2024 All rights reserved</p>
    </div>
  );
};
export default Footer;
