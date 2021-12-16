import { useRouter } from "next/router";
import Icons from "./icons";

const Footer: React.FC = () => {
  const router = useRouter();
  
  return (
    <footer className={`w-full bg-white ${router.pathname === "/" ? "" : "fixed bottom-0"}`}>
      <div className="border-t-1 border-gray-300">
        <div className="container m-auto flex justify-between py-4">
          <div className="text-pink-primary cursor-default">
            Token<span className="text-blue-lightblue">Kid</span>
          </div>
          <Icons />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
