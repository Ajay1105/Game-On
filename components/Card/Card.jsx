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
      <img src={`./stadium${Math.floor(Math.random() * 4) + 1}.jpg`} alt="stadim" onClick={handleClick} className=" h-80 w-80"/>
      <div className="heading">{heading}</div>
      <div className="heading">{location}</div>
    </div>
  );
};
export default Card;
