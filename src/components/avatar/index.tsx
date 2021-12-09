import React from "react";

const GradientAvatar: React.FC<{
  address?: string;
  size?: string;
  t?: boolean;
}> = ({
  address = "0x505D61759efFF407939606b47Ca721E2A18f3ea2",
  size = "h-10 w-10",
}) => {
  function djb2Hash(str) {
    const len = str.length;
    let hash = Math.floor(1000 + Math.random() * 9000);
    for (let idx = 0; idx < len; ++idx) {
      hash = 33 * hash + str.charCodeAt(idx);
    }
    return hash;
  }

  const hashValue = djb2Hash(address);
  const degreesInACircle = 360;
  const hue1 = hashValue % degreesInACircle;
  const hue2 = (hue1 + 120) % degreesInACircle;

  return (
    <div
      className={`${size} rounded-full`}
      style={{
        background: `linear-gradient(hsl(${hue1}deg, 100%, 50%), hsl(${hue2}deg, 30%, 70%)`,
      }}
    ></div>
  );
};

export default GradientAvatar;
