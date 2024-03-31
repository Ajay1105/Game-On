import Navbar from "@/components/Navbar/Navbar";
import './index.css'

const Contact = () => {
    return (
      <>
      <Navbar/>
        <div className="py-10 w-full flex justify-center items-center flex-col ">
          <div className="text-3xl font-bold mt-7 mb-20 contact-heading">Contact Us</div>
          <div className="text-lg mb-20 contact-subheading">Feel free to contact us</div>
          <div className="text-white p-6 rounded-md shadow-md">
            <p className="mb-4 name">
              <span className="font-bold ">Name:</span> <span className="font-light">Shivam Tiwari</span>
            </p>
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
  