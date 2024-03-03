import Image from "next/image";
import "./index.css";
import { useRouter } from "next/navigation";
const Card = ({ heading, id, location }) => {
  const router = useRouter();

  const handleClick = () => {
  console.log(id);
    router.push(`/stadium/${id}`);
  };
  
  return (
    <div className="card">
      <img src={"./cricket.jpg"} alt="stadium" onClick={handleClick} className=" h-80 w-80"/>
      <div className="heading">{heading}</div>
      <div className="sub-heading">{location}</div>
    </div>
  );
};
export default Card;
