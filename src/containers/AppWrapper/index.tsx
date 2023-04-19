import { fetchFromContract } from "@/hooks/fetchFromContract";
import { ExclamationIcon } from "@heroicons/react/solid";
import { useAccount } from "wagmi";

// TODO:
const AppWrapper: React.FC = ({ children }) => {
  const { status } = useAccount();
  const { tokenNotFound, loading, tokeninfo } = fetchFromContract();

  return (
    <>
      {tokenNotFound || loading || status === "reconnecting" ? (
        <div className="flex items-center justify-center h-screen" id="one">
          <div className="flex flex-col text-black">
            {!(loading || status === "reconnecting") && (
              <ExclamationIcon className="w-52 h-52 text-red-400" />
            )}
            <div className="text-3xl">
              {tokenNotFound
                ? "Token Not Found"
                : loading || status === "reconnecting"
                ? "Loading"
                : "Connect To Wallet"}
            </div>
          </div>
        </div>
      ) : tokeninfo ? (
        children
      ) : (
        <div />
      )}
    </>
  );
};

export default AppWrapper;
