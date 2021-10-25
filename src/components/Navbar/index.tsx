const Navbar: React.FC = () => {
  return (
    <nav className="shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex flex-row items-center space-x-2 cursor-pointer">
            <div className="py-2 h-full w-full">
              <img className="h-full w-full" src="/images/logo.svg" alt="TK" />
            </div>
            <div className="font-bold text-2xl text-pink-primary hover:text-primary-hover">TokenKid</div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <button
                type="button"
                className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-primary shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-lightblue"
              >
                <img
                  className="-ml-1 mr-2 h-5 w-5"
                  src="/images/icons/wallet.svg"
                  alt=""
                />
                <span>Connect Wallet</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
