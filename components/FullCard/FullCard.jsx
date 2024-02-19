"use client"
import Image from "next/image";
import "./index.css";
import { useRouter } from "next/navigation";

const FullCard = ({params}) => {
  const router = useRouter();
  const handleClick = () => {
    console.log(params);
    //router.push(`/stadium/book/${params.id}`);
  };
  return (
    <div className="fullCard-container">
      <div className="inside">
        {/* <img className="image" src="./stadium1.jpg" /> */}
        <Image src="/stadium1.jpg" alt="Picture of the author" width={900} height={800} className="image" />
        <div className="stadium">Eden Gardens</div>
        <div className="subheading">Kolkata</div>
        <div className="timing">Open 24 hours</div>
        <div className="description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum quas itaque esse in doloremque, soluta ipsa illum laboriosam suscipit officia, saepe eligendi. Quos exercitationem perferendis ipsam eligendi, corrupti soluta necessitatibus laboriosam, blanditiis esse quasi itaque perspiciatis praesentium eveniet modi molestiae deleniti maiores est minus, rem deserunt ab quod. Debitis voluptate excepturi officia totam veniam eveniet laboriosam magni aliquid maxime reprehenderit!
        </div>
        <div className="sports-container">
          <div className="sports-heading">Sports</div>
          <div className="sports">
            <div className="cricket">
            <Image src="/cricket.svg" alt="Picture of the author" width={100} height={100} className="cricket" />
             {/* <img className="cricket" src="./cricket.svg" /> */}
              <div className="title">Cricket</div>
            </div>
            <div className="football">
              <Image src="/football.svg" alt="Picture of the author" width={100} height={100} className="football" />
              {/*<img className="football" src="./football.svg" />*/}
              <div className="title">Football</div>
            </div>
          </div>
        </div>
        <button className="slots" onClick={handleClick}>View Available slots</button>
      </div>
    </div>
  );
};
export default FullCard;
