import Navbar from "@/components/Navbar/Navbar";
import './index.css'

const Contact = () => {
    return (
      <>
      <Navbar/>
        <div className="py-10 w-full flex justify-center items-center flex-col ">
          <div className="text-3xl font-bold mt-7 mb-20 contact-heading">Contact Us</div>
          <div className="text-lg mb-20 contact-subheading">Feel free to contact us</div>
          <div className="text-white p-4 rounded-md shadow-md">
          
          <div className=" flex flex-row justify-center gap-8 mb-8">
            <a href="https://www.instagram.com/_gameon_india?igsh=MTRhMHFvMG1rYWRjbw==" target="_blank"><img src="/icons/instagram.png" className="w-10 h-10 md:size-28 invert" /></a>
            <a href="https://www.linkedin.com/company/gameonfit/" target="_blank"><img src="/icons/linkedin.png" className="w-10 h-10 md:size-28 invert" /></a>
          </div>
          
            <p className="mb-4 email">
              <span className="font-bold ">Email:</span> <span className="font-light">help@gameon.com</span>
            </p>
            <p className="mb-4 number">
              <span className="font-bold ">Contact No:</span> <span className="font-light">+918896172818</span>
            </p>
          </div>
        </div>
      </>
    );
  };
  
  export default Contact;
  