import Link from "next/link";
import ConnectWallet from "@/components/connectWallet";

const Navbar: React.FC = () => {
  return (
    <nav className="shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link href="/">
            <div className="flex flex-row items-center space-x-2 cursor-pointer">
              <div className="py-2 h-full w-full">
                <img
                  className="h-full w-full"
                  src="/images/logo.svg"
                  alt="TK"
                />
              </div>
              <div className="font-bold text-2xl text-pink-primary hover:text-primary-hover">
                TokenKid
              </div>
            </div>
          </Link>
          <div className="flex items-center">
            <ConnectWallet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
