import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationIcon,
} from "@heroicons/react/solid";
import Spinner from "../spinner";

interface IStateIcon {
  loading: boolean;
  done: boolean;
  error: boolean;
}

const StateIcon: React.FC<IStateIcon> = ({ loading, done, error }) => {
  return (
    <>
      {loading ? (
        <Spinner className="text-current animate-spin-slow w-5 h-5" />
      ) : done ? (
        <CheckCircleIcon className="text-green-400 w-5 h-5" />
      ) : error ? (
        <ExclamationIcon className=" text-red-400 w-5 h-5" />
      ) : (
        <ClockIcon className="text-blue-lightblue w-5 h-5" />
      )}
    </>
  );
};

export default StateIcon;
