import { GlobeAltIcon } from "@heroicons/react/solid";

const Icons: React.FC = () => {
  return (
    <div className="flex flex-row items-center justify-center space-x-2">
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
      <a
        href="https://discordapp.com/users/457473808706568194"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="w-6 h-6 popup-hover"
          src="/images/icons/discord.svg"
          alt=""
        />
      </a>
      <a href="https://mutai.dev/" target="_blank" rel="noopener noreferrer">
        <GlobeAltIcon className="font-thin w-6 h-6 popup-hover" />
      </a>
    </div>
  );
};

export default Icons;
