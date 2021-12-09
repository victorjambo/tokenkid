import { useRouter } from "next/router";

const Footer: React.FC = () => {
  const router = useRouter();
  console.log();
  
  return (
    <footer className={`w-full bg-white ${router.pathname === "/" ? "" : "fixed bottom-0"}`}>
      <div className="border-t-1 border-gray-300">
        <div className="container m-auto flex justify-between py-4">
          <div className="text-pink-primary cursor-default">
            Token<span className="text-blue-lightblue">Kid</span>
          </div>
          <div className="flex flex-row space-x-2">
            <a
              href="https://twitter.com/victor_jambo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="w-6 h-6 popup-hover"
                src="/images/icons/twitter.svg"
                alt=""
              />
            </a>
            <a
              href="https://github.com/victorjambo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="w-6 h-6 popup-hover"
                src="/images/icons/github.svg"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
