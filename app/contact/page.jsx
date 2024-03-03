import Navbar from "@/components/Navbar/Navbar";

const Contact = () => {
    return (
      <>
      <Navbar/>
        <div className="py-10 w-full flex justify-center items-center flex-col ">
          <p className="text-3xl font-bold mb-2">Game On</p>
          <p className="text-3xl font-bold mb-6">Contact Us</p>
          <p className="text-lg mb-4">Feel free to contact us</p>
          <div className="text-white p-6 rounded-md shadow-md">
            <p className="mb-2">
              <span className="font-semibold">Name:</span> Shivam Tiwari
            </p>
            <p className="mb-2">
              <span className="font-semibold">Email:</span> help@gameon.com
            </p>
            <p className="mb-2">
              <span className="font-semibold">Contact No:</span> +91 2434890983
            </p>
          </div>
        </div>
      </>
    );
  };
  
  export default Contact;
  