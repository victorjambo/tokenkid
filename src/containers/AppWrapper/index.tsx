import { useContractKit } from "@celo-tools/use-contractkit";
import { ExclamationIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const AppWrapper: React.FC = ({ children }) => {
  const router = useRouter();

  const { walletType } = useContractKit();

  const [showConnectToWallet, setShowConnectToWallet] = useState(false);

  const protectedRoutes = ["/create", "/assets/[tokenId]"];

  useEffect(() => {
    if (
      walletType === "Unauthenticated" &&
      protectedRoutes.includes(router.pathname)
    ) {
      setShowConnectToWallet(true);
    } else {
      setShowConnectToWallet(false);
    }
  }, [walletType, router.pathname]);

  return (
    <>
      {showConnectToWallet ? (
        <div className="flex items-center justify-center h-screen" id="one">
          <div className="flex flex-col text-black">
            <ExclamationIcon className="w-52 h-52 text-red-400" />
            <div className="text-3xl">Connect To Wallet</div>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default AppWrapper;
